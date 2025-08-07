import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { DeleteExpenseProps } from "../types";

import { api } from "../service/api";

// funcao para deletar despesa
async function deleteExpense({ idExpense, token }: DeleteExpenseProps) {
  // função deletar despesa
  const { data } = await api.delete(`/expense/${idExpense}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

// hook para deletar despesa
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(`Despesa ${data.name} deletada com sucesso!`);
    },
    onError: () => {
      toast.error("Erro ao deletar despesa. Tente novamente.");
    },
  });
}
