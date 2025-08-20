import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import type { AxiosError } from "axios";

import { verifyUser } from "../service/verifyUser";
import { AuthContext } from "../context/AuthContext";

// hook para verificar usuario
export function useVerifyUser() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setIsLoadingEmail, setForgotPassword } = context;

  return useMutation({
    mutationFn: verifyUser,
    onMutate: () => setIsLoadingEmail(true),
    onSuccess: (data) => {
      navigate("/changepassword");
      setForgotPassword(data);
    },
    onError: (err) => {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error);
    },
    onSettled: () => setIsLoadingEmail(false),
  });
}
