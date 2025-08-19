import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UpdateReadNotification } from "../service/UpdateReadNotificationService";
import type { ExpenseProps } from "../types";

export function useUpdateReadNotification() {
  const queryClient = useQueryClient();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;

  return useMutation({
    mutationFn: UpdateReadNotification,
    onSuccess: (_, variables: { idUser: string; idExpense: string }) => {
      // Tipo explícito do cache
      queryClient.setQueryData<ExpenseProps[]>(
        ["expenses", "notification", { type: "notification", id: user?.id }],
        (oldData) =>
          oldData?.map((expense) =>
            expense.id === variables.idExpense
              ? { ...expense, read: true }
              : expense
          )
      );

      queryClient.invalidateQueries({
        queryKey: [
          "expenses",
          "notification",
          { type: "notification", id: user?.id },
        ],
      });
    },
  });
}
