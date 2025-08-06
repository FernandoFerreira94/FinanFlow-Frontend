import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";
import type { ExpenseProps } from "../types";
import type { GetExpense } from "../types";

function formatDateOnly(dateStr?: string | null) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearFull = date.getFullYear().toString();
  const yearShort = yearFull.slice(-2); // pega só os 2 últimos dígitos

  return `${day}/${month}/${yearShort}`;
}

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

export function useExpenses({ type, id, token, month, year }: GetExpense) {
  return useQuery({
    queryKey: ["expenses", type, id, month, year],
    queryFn: () => fetchExpenses({ type, id, token, month, year }),
    select: (data) =>
      data.map((expense: ExpenseProps) => ({
        ...expense,
        dueDate: formatDateOnly(expense.dueDate),
        purchaseDate: formatDateOnly(expense.purchaseDate),
        paymentDate: formatDateOnly(expense.paymentDate),
      })),
    enabled: !!id && !!token,
  });
}
