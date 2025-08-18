import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePasswordUser } from "../service/changePassowordUser";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
