// Função de login
import { api } from "./api";
import type { UserProps, LoginUserProps } from "../types";

export const LoginUser = async ({
  email,
  password,
}: LoginUserProps): Promise<UserProps> => {
  const { data } = await api.post("/session", {
    email,
    password,
  });
  return data;
};
