import { createContext } from "react";

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
}

// criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
