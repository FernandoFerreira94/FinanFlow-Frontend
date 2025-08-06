import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../service/api";
import Cookies from "js-cookie";
import type { UserProps, LoginUserProps } from "../types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
  const [user, setUser] = useState<UserProps | null>(null);
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

  // Delete Expense

  return (
    <AuthContext.Provider
      value={{
        LoginUser,
        user,
        setUser,
        Logout,
        showModalLogin,
        setShowModalLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
