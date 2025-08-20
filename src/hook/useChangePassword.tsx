import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useContext } from "react";

import type { AxiosError } from "axios";

import { changePassword } from "../service/changePassword";
import { AuthContext } from "../context/AuthContext";

// hook para alterar senha usuario deslogado
export function useChangePassword() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setIsLoadingEmail } = context;

  return useMutation({
    mutationFn: changePassword,
    onMutate: () => setIsLoadingEmail(true),
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
    },
    onError: (err) => {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error);
    },
    onSettled: () => {
      setIsLoadingEmail(false);
    },
  });
}
