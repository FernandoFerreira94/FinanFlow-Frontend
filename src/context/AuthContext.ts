import { createContext } from "react";
import type { UserProps, LoginUserProps } from "./AuthProvider";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  LoginUser: (data: LoginUserProps) => Promise<UserProps>;
  Logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
