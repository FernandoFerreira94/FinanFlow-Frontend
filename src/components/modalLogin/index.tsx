import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

import { AuthContext } from "../../context/AuthContext";

import type { LoginUserProps, UserProps } from "../../context/AuthProvider";

export default function ModalLogin() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext not found");
  const { LoginUser, setUser } = context;

  const { mutate, isPending } = useMutation<
    UserProps,
    AxiosError,
    LoginUserProps
  >({
    mutationFn: LoginUser,
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
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Erro ao logar.");
      console.log(error);
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate({ email, password });
  }

  return (
    <div className=" border border-black fixed top-16   p-8 rounded-lg  bg-emerald-950">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-white w-full text-center text-xl font-semibold">
          Login
        </h1>
        <label
          htmlFor="email"
          className="text-white w-full text-sm font-semibold"
        >
          {" "}
          Email:
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            className=" bg-gray-100 text-black rounded-md ml-2 px-1 py-0.5 font-normal"
            required
          />
        </label>
        <label
          htmlFor="password"
          className="text-white w-full  text-sm font-semibold "
        >
          {" "}
          Senha:
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className=" bg-gray-100 text-black rounded-md ml-2 px-1 py-0.5 font-normal"
            required
          />
        </label>
        <input
          type="submit"
          value={`${isPending ? "Entrando..." : "Entrar"}`}
          disabled={isPending}
          className=" rounded-md bg-emerald-950 text-white border py-0.5 cursor-pointer text-sm tracking-wider
          transition duration-500 hover:bg-emerald-800 "
        />
      </form>
    </div>
  );
}
