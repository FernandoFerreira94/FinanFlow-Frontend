import { useContext } from "react";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

import type { AxiosError } from "axios";
import type { UserProps, LoginUserProps } from "../types";

import { AuthContext } from "../context/AuthContext";
import { LoginUser } from "../service/loginEmail";

// hook para fazer login com email
export function useLoginEmail(): UseMutationResult<
  UserProps,
  AxiosError,
  LoginUserProps
> {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setUser, setIsLoadingEmail } = context;
  const navigate = useNavigate();

  return useMutation<UserProps, AxiosError, LoginUserProps>({
    mutationFn: LoginUser,
    onMutate: () => setIsLoadingEmail(true),
    onSuccess: (data) => {
      const { name, email, id, token } = data;
      setUser({ name, email, id, token });
      Cookies.set("tokenFinanFlow", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      navigate("/dashboard");
    },
    onError: (err) => {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error);
      console.log(error);
    },
    onSettled: () => setIsLoadingEmail(false),
  });
}
