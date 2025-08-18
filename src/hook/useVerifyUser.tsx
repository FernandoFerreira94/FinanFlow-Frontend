import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyUser } from "../service/verifyUser";
import type { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
