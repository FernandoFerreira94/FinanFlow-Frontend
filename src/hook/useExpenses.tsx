import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import type { ExpenseProps, GetExpense } from "../types";

import { fetchExpenses } from "../service/getExpense";
import { AuthContext } from "../context/AuthContext";
import { formatDateOnly } from "../utils/date";

export function useExpenses({ type, month, year }: GetExpense) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;
  return useQuery({
    queryKey: ["expenses", { type, id: user?.id, month, year }],
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
