import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import type {
  UserProps,
  LoginUserProps,
  CreateExpense,
  ChangePassword,
  RegisterUserProps,
  NotificationProps,
} from "../types";

import { api } from "../service/api";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";

// Componente AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [notification, setNotification] = useState<NotificationProps[] | null>(
    null
  );

  // Recupera dados do usuário via token salvo nos cookies
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

  async function getNotification() {
    const response = await api.get("/notification", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  }

  // Query do React Query v5 (sem onSuccess)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["notification", user?.id],
    queryFn: () => getNotification(),
    enabled: !!user?.token, // só busca se o usuário estiver logado
    staleTime: Infinity, // nunca expira sozinho
  });

  // Sincroniza os dados retornados pelo React Query com o state local
  useEffect(() => {
    if (data) {
      setNotification(data);
    }
  }, [data]);

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

  // Mudar lida notificação
  const updateReadNotification = async (idNotification: string) => {
    await api.put(
      "/notification",
      {
        notificationId: idNotification,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
  };

  // delete notification
  const deleteNotification = async (idNotification: string) => {
    await api.delete(`/notification/${idNotification}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  };

  // funcao para criar notificação
  const createNotification = async (expenseId: string, paid: boolean) => {
    if (paid) return;

    await api.post(
      "/notification",
      {
        expenseId,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
  };

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
        notification,
        setNotification,
        isLoadingNotification: isLoading,
        isErrorNotification: isError,
        refetchNotification: refetch,
        updateReadNotification, // você chama isso após criar/alterar uma notificação
        deleteNotification,
        createNotification,
        getNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
