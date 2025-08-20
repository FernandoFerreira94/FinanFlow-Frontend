import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import type { UserProps } from "../types";

import { api } from "../service/api";
import { AuthContext } from "./AuthContext";

// Componente AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [forgotPassword, setForgotPassword] = useState<UserProps | null>(null);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingCreateExpense, setIsLoadingCreateExpense] = useState(false);

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


  // Função de logout
  function Logout() {
    Cookies.remove("tokenFinanFlow");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        Logout,
        showModalLogin,
        setShowModalLogin,
        isLoadingCreateExpense,
        setIsLoadingCreateExpense,
        isLoadingEmail,
        setIsLoadingEmail,
        isLoadingGoogle,
        setIsLoadingGoogle,
        forgotPassword,
        setForgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
