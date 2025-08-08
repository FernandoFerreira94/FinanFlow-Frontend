import { createContext } from "react";
import type { CredentialResponse } from "@react-oauth/google";

import type {
  UserProps,
  LoginUserProps,
  CreateExpense,
  ChangePassword,
  RegisterUserProps,
} from "../types";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  LoginUser: (data: LoginUserProps) => Promise<UserProps>;
  Logout: () => void;
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  createExpense: (data: CreateExpense) => Promise<CreateExpense>;
  changePassword: (data: ChangePassword) => Promise<ChangePassword>;
  registerUser: (data: RegisterUserProps) => Promise<RegisterUserProps>;
  getPantryExpense: () => Promise<CreateExpense[]>;
  updateRead: (idExpense: string) => Promise<void>;
  loginGoogle: (credentialResponse: CredentialResponse) => Promise<UserProps>;
}
// criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
