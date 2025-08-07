import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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

  // Pegando os dados do usuário
  useEffect(() => {
    const token = Cookies.get("tokenFinanFlow");

    async function getUser() {
      if (token) {
        try {
          const response = await api.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { name, email, id } = response.data;
          setUser({ name, email, id, token });
        } catch (error) {
          console.error("Failed to fetch user:", error);
          Cookies.remove("tokenFinanFlow");
        }
      }
    }

    getUser();
  }, []);

  // Dados do usuário
  const [user, setUser] = useState<UserProps | null>(null);
  // Modal de login
  const [showModalLogin, setShowModalLogin] = useState(false);

  // funçao para logar o usuario
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

  // função para deslogar o usuario
  function Logout() {
    Cookies.remove("tokenFinanFlow");
    setUser(null);
  }

  // funcao para criar despesa
  async function createExpense(data: CreateExpense) {
    const response = await api.post("/expense", data, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  }

  //função para alterar senha
  async function changePassword(data: ChangePassword) {
    const response = await api.put("/update/password", data, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  }

  // função para cadastrar usuário
  async function registerUser({ name, email, password }: RegisterUserProps) {
    const reponse = await api.post("/users", {
      name,
      email,
      password,
    });

    return reponse.data;
  }

  return (
    <AuthContext.Provider
      value={{
        LoginUser,
        user,
        setUser,
        Logout,
        showModalLogin,
        setShowModalLogin,
        createExpense,
        changePassword,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
