import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword } from "../service/changePassword";
import type { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useChangePassword() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setIsLoadingEmail, setForgotPassword } = context;

  return useMutation({
    mutationFn: changePassword,
    onMutate: () => setIsLoadingEmail(true),
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      navigate("/loginMobile");
      setForgotPassword(null);
    },
    onError: (err) => {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error);
    },
    onSettled: () => setIsLoadingEmail(false),
  });
}
