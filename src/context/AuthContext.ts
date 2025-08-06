import { createContext } from "react";
import type { UserProps, LoginUserProps } from "../types";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  LoginUser: (data: LoginUserProps) => Promise<UserProps>;
  Logout: () => void;
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
