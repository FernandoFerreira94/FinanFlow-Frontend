import { api } from "../api";
import type { RegisterUserProps } from "../../types";
// Cadastrar usuário
export async function registerUser({
  name,
  email,
  password,
}: RegisterUserProps) {
  const reponse = await api.post("/users", {
    name,
    email,
    password,
  });
  return reponse.data;
}
