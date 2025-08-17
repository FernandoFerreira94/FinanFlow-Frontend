import { createContext } from "react";

import type {
  UserProps,
  CreateExpense,
  ChangePassword,
  RegisterUserProps,
} from "../types";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  Logout: () => void;
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  createExpense: (data: CreateExpense) => Promise<CreateExpense>;
  changePassword: (data: ChangePassword) => Promise<ChangePassword>;
  registerUser: (data: RegisterUserProps) => Promise<RegisterUserProps>;
  getPantryExpense: () => Promise<CreateExpense[]>;
  updateRead: (idExpense: string) => Promise<void>;

  isLoadingEmail: boolean;
  setIsLoadingEmail: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingGoogle: boolean;
  setIsLoadingGoogle: React.Dispatch<React.SetStateAction<boolean>>;
}
// criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
