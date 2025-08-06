import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../service/api";
import { toast } from "sonner";
import type { DeleteExpenseProps } from "../types";

async function deleteExpense({ idExpense, token }: DeleteExpenseProps) {
  const { data } = await api.delete(`/expense/${idExpense}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

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
