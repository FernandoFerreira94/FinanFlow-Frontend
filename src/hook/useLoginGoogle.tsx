import { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "../context/AuthContext";

import type { UserProps } from "../types";

export function useLoginGoogle() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setUser, loginGoogle } = context;

  const mutation = useMutation({
    mutationFn: async (credentialResponse: any) => {
      return loginGoogle(credentialResponse); // faz a requisição ao backend
    },
    onSuccess: (userData: UserProps) => {
      const { name, email, id, token } = userData;
      setUser({ name, email, id, token });

      Cookies.set("tokenFinanFlow", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Falha no login com Google");
    },
  });

  const login = useGoogleLogin({
    onSuccess: (credentialResponse: any) => mutation.mutate(credentialResponse),
    onError: () => toast.error("Login Google falhou"),
  });

  return login;
}
