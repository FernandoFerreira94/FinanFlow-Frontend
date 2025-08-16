import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import type { CredentialResponse } from "@react-oauth/google";
import type {
  UserProps,
  LoginUserProps,
  CreateExpense,
  ChangePassword,
  RegisterUserProps,
} from "../types";

import { api } from "../service/api";
import { AuthContext } from "./AuthContext";

// Componente AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [showModalLogin, setShowModalLogin] = useState(false);

  // Recupera dados do usuário via token salvo nos cookies
  useEffect(() => {
    async function fetchUser() {
      const token = Cookies.get("tokenFinanFlow");

      if (!token) {
        setUser(null);
        return;
      }
      try {
        const response = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Resposta /user:", response.data);
        const { id, name, email } = response.data;
        setUser({ id, name, email, token });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        Cookies.remove("tokenFinanFlow");
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const getPantryExpense = async () => {
    const response = await api.get("/notification", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  };

  // Função de login
  const LoginUser = async ({
    email,
    password,
  }: LoginUserProps): Promise<UserProps> => {
    const { data } = await api.post("/session", {
      email,
      password,
    });
    return data;
  };

  // Função de logout
  function Logout() {
    Cookies.remove("tokenFinanFlow");
    setUser(null);
  }

  // Criar despesa
  async function createExpense(data: CreateExpense) {
    const response = await api.post("/expense", data, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  }

  // Alterar senha
  async function changePassword(data: ChangePassword) {
    const response = await api.put("/update/password", data, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  }

  // Cadastrar usuário
  async function registerUser({ name, email, password }: RegisterUserProps) {
    const reponse = await api.post("/users", {
      name,
      email,
      password,
    });
    return reponse.data;
  }

  // função update read
  const updateRead = async (idExpense: string) => {
    await api.put(`/update/read/${user?.id}/${idExpense}`, null, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  };

  // Função de login com Google
  async function loginGoogle(data: CredentialResponse): Promise<UserProps> {
    if (!data?.credential) {
      console.error("Token do Google não recebido");
      throw new Error("Token do Google não recebido"); // lança erro para tratar no componente
    }

    try {
      const response = await api.post("/auth/google", {
        credential: data.credential,
      });

      const { token, id, name, email } = response.data;
      console.log(response.data.token);

      Cookies.set("tokenFinanFlow", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      setUser({ id, name, email, token });

      return { id, name, email, token };
    } catch (error) {
      console.error("Erro no login Google", error);
      throw error; // propaga erro para ser tratado no componente
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        LoginUser,
        Logout,
        showModalLogin,
        setShowModalLogin,
        createExpense,
        changePassword,
        registerUser,
        getPantryExpense,
        updateRead,
        loginGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
