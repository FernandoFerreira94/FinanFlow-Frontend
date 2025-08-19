import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExpense } from "../service/createExpense";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export function useCreateExpense() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context is undefined");
  const { setIsLoadingCreateExpense } = context;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onMutate: () => setIsLoadingCreateExpense(true),
    onSuccess: () => {
      toast.success("Despesa criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["expenses"] as const });
    },
    onError: () => {
      toast.error("Erro ao criar despesa. Tente novamente.");
    },
    onSettled: () => setIsLoadingCreateExpense(false),
  });
}
