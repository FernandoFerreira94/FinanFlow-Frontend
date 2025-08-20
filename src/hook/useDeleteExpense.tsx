import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteExpense } from "../service/deleteExpense";

// hook para deletar despesa
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idExpense: string) => deleteExpense(idExpense),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(`Despesa ${data.name} deletada com sucesso!`);
    },
    onError: () => {
      toast.error("Erro ao deletar despesa. Tente novamente.");
    },
  });
}
