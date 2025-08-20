import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useContext } from "react";

import { paidExpense } from "../service/paidExpense";
import { AuthContext } from "../context/AuthContext";

// hook para marcar despesa como paga
export function usePaidExpense() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context is undefined");

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
