import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../service/api";
import { toast } from "sonner";
import type { DeleteExpenseProps } from "../types";

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
