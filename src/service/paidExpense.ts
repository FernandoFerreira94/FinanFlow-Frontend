import { api } from "../service/api";

import type { DeleteExpenseProps } from "../types";

// Função para marcar a despesa como paga
export async function paidExpense({ idExpense, token }: DeleteExpenseProps) {
  const { data } = await api.put(
    `/update/expense/${idExpense}`,
    {
      paid: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
