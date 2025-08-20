import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useContext } from "react";

import type { AxiosError } from "axios";

import { registerUser } from "../service/registerUserEmail";
import { useLoginEmail } from "./useLoginEmail";
import { AuthContext } from "../context/AuthContext";

// hook para fazer cadastro
export function useRegister() {
  const loginEmail = useLoginEmail();

  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setIsLoadingEmail } = context;

  return useMutation({
    mutationFn: registerUser,
    onMutate: () => setIsLoadingEmail(true),
    onSuccess: (_, variables) => {
      toast.success("Cadastro realizado com sucesso!");
      // Após cadastro, faz login automático
      loginEmail.mutate({
        email: variables.email,
        password: variables.password,
      });
    },
    onError: (err) => {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Erro ao cadastrar.");
    },
    onSettled: () => setIsLoadingEmail(false),
  });
}
