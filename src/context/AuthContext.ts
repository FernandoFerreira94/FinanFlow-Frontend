import { createContext } from "react";

import type {
  UserProps,
  LoginUserProps,
  CreateExpense,
  ChangePassword,
  RegisterUserProps,
  NotificationProps,
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
  notification: NotificationProps[] | null;
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationProps[] | null>
  >;
  isLoadingNotification: boolean;
  isErrorNotification: boolean;
  refetchNotification: () => void;
  updateReadNotification: (idNotification: string) => Promise<void>;
  deleteNotification: (idNotification: string) => Promise<void>;
  createNotification: (expenseId: string, paid: boolean) => Promise<void>;
  getNotification: () => Promise<NotificationProps[]>;
}
// criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
