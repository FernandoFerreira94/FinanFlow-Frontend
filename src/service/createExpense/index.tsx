import { api } from "../api";
import type { CreateExpense } from "../../types";
import Cookies from "js-cookie";

export async function createExpense(data: CreateExpense) {
  const token = Cookies.get("tokenFinanFlow");
  const response = await api.post("/expense", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
