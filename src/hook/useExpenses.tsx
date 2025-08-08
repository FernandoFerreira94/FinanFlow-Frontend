import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import type { ExpenseProps } from "../types";
import type { GetExpense } from "../types";

import { api } from "../service/api";
import { AuthContext } from "../context/AuthContext";

// funcao para formatar a data
function formatDateOnly(dateStr?: string | null) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearFull = date.getFullYear().toString();
  const yearShort = yearFull.slice(-2); // pega só os 2 últimos dígitos

  return `${day}/${month}/${yearShort}`;
}

// funcao para buscar as despesas / nao pagas / pagas / todas / por mês
async function fetchExpenses({
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

// hook para buscar as despesas
export function useExpenses({ type, month, year }: GetExpense) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;
  return useQuery({
    queryKey: ["expenses", type, user?.id, month, year],
    queryFn: () =>
      fetchExpenses({
        type,
        id: user?.id || "",
        token: user?.token || "",
        month,
        year,
      }),
    select: (data) =>
      data.map((expense: ExpenseProps) => ({
        ...expense,
        dueDate: formatDateOnly(expense.dueDate),
        purchaseDate: formatDateOnly(expense.purchaseDate),
        paymentDate: formatDateOnly(expense.paymentDate),
      })),
    enabled: !!user?.id && !!user?.token,
  });
}
