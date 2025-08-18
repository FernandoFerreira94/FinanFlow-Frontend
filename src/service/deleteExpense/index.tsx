import { api } from "../api";

import Cookies from "js-cookie";

export async function deleteExpense(idExpense: string) {
  const token = Cookies.get("tokenFinanFlow");
  const { data } = await api.delete(`/expense/${idExpense}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
