import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { DeleteExpenseProps } from "../types";

import { api } from "../service/api";

// funcao para marcar despesa como paga
async function paidExpense({ idExpense, token }: DeleteExpenseProps) {
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

// hook para marcar despesa como paga
export function usePaidExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paidExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(`Despesa ${data.name} paga com sucesso!🤑`);
    },
    onError: () => {
      toast.error("Ops algo deu errado! 😞");
    },
  });
}
