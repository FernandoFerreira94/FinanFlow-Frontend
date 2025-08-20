import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { changePasswordUser } from "../service/changePassowordUser";
import { AuthContext } from "../context/AuthContext";

// hook para alterar senha usuario logado
export function useChangePasswordUser() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setIsLoadingEmail } = context;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: changePasswordUser,
    onMutate: () => setIsLoadingEmail(true),
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      navigate("/user");
    },
    onError: () => {
      toast.error("Erro ao alterar senha");
    },
    onSettled: () => {
      setIsLoadingEmail(false);
    },
  });
}
