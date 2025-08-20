import { api } from "./api";
import type { ChangePassword } from "../types";
import Cookies from "js-cookie";

export async function changePasswordUser({
  oldPassword,
  newPassword,
}: ChangePassword) {
  const token = Cookies.get("tokenFinanFlow");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.put(
    "/update/password",
    { oldPassword, newPassword }, // corpo que o back espera
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}
