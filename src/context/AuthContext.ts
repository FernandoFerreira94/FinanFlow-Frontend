import { createContext } from "react";

import type { UserProps, CreateExpense } from "../types";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  Logout: () => void;
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  createExpense: (data: CreateExpense) => Promise<CreateExpense>;
  getPantryExpense: () => Promise<CreateExpense[]>;
  updateRead: (idExpense: string) => Promise<void>;
  isLoadingEmail: boolean;
  setIsLoadingEmail: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingGoogle: boolean;
  setIsLoadingGoogle: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: UserProps | null;
  setForgotPassword: React.Dispatch<React.SetStateAction<UserProps | null>>;
}
// criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
