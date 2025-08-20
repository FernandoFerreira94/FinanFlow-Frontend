import { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

import type { UserProps } from "../types";

import { AuthContext } from "../context/AuthContext";
import { loginGoogleApi } from "../service/LoginGoogle";

// hook para fazer login com google
export function useLoginGoogle() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setUser, setIsLoadingGoogle } = context;

  // React Query mutation
  const mutation = useMutation({
    mutationFn: loginGoogleApi,
    onMutate: () => setIsLoadingGoogle(true),
    onSuccess: (userData: UserProps) => {
      const { name, email, id, token } = userData;
      setUser({ name, email, id, token });
      console.log(userData);
      Cookies.set("tokenFinanFlow", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error("Falha no login com Google");

      console.log(err);
    },

    onSettled: () => setIsLoadingGoogle(false),
  });

  // hook do Google
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log("Google response:", credentialResponse);
      mutation.mutate(credentialResponse);
    },
    onError: () => toast.error("Login Google falhou"),
    flow: "implicit", // garante que você receba credential
  });

  return login;
}
