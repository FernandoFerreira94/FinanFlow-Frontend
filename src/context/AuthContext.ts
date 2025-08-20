import { createContext } from "react";

import type { UserProps } from "../types";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  Logout: () => void;
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingEmail: boolean;
  setIsLoadingEmail: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingGoogle: boolean;
  setIsLoadingGoogle: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: UserProps | null;
  setForgotPassword: React.Dispatch<React.SetStateAction<UserProps | null>>;
  isLoadingCreateExpense: boolean;
  setIsLoadingCreateExpense: React.Dispatch<React.SetStateAction<boolean>>;
}
// criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
