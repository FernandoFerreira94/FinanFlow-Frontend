import { api } from "../api";
import type { ExpenseProps, GetExpense } from "../../types";


export async function fetchExpenses({
  type,
  id,
  token,
  month,
  year,
}: GetExpense): Promise<ExpenseProps[]> {
  if (type === "month") {
    const { data } = await api.get(`/${type}/${month}/${year}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } else {
    const { data } = await api.get(`/${type}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}
