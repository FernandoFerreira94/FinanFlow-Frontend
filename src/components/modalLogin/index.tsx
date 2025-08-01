import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";

import type { LoginUserProps, UserProps } from "../../context/AuthProvider";

export default function ModalLogin() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className=" absolute top-17 py-10 px-10  rounded-lg min-w-2/12  bg-emerald-950 z-10 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <h1 className="text-white w-full text-center text-2xl font-semibold">
          Login
        </h1>
        <label
          htmlFor="email"
          className="w-full text-white text-[1rem] font-semibold"
        >
          <div className="flex items-center justify-between w-full gap-2">
            <span>Email:</span>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              className="flex-1 text-[1rem] bg-gray-100 text-black rounded-md px-2 py-1 font-normal"
              required
            />
          </div>
        </label>
        <label
          htmlFor="password"
          className="w-full text-white text-[1rem] font-semibold"
        >
          <div className="flex items-center justify-between w-full gap-2 relative">
            <span>Senha:</span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              className="flex-1 text-[1rem] bg-gray-100 text-black rounded-md px-2 py-1 font-normal "
              required
            />
            <button
              className="absolute right-2 text-xl text-black "
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
        </label>
        <input
          type="submit"
          value={`${isPending ? "Entrando..." : "Entrar"}`}
          disabled={isPending}
          className=" rounded-md text-[1rem] bg-emerald-950 text-white border py-1 cursor-pointer text-sm tracking-wider
          transition duration-500 hover:bg-emerald-800 "
        />
      </form>
    </div>
  );
}
