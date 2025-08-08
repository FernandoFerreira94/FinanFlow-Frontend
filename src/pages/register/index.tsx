import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Cookies from "js-cookie";

import type { LoginUserProps, UserProps } from "../../types";
import { Header } from "../../componentsGlobal/header";
import { Footer } from "../../componentsGlobal/footer";
import { Container } from "../../componentsGlobal/container";
import { AuthContext } from "../../context/AuthContext";
import ImgRegister from "../../assets/imgRegister.png";

// Componente de cadastro
export default function Register() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setShowModalLogin, registerUser, LoginUser, setUser } = context;
  const [showPassword, setShowPassword] = useState(false);

  // Funçao para cadastrar o usuario
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
    },
    onError: (err) => {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Erro ao cadastrar.");
    },
  });

  const loginMutate = useMutation<UserProps, AxiosError, LoginUserProps>({
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

  // Funçao button para cadastrar o usuario
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await mutate({ name, email, password });

    loginMutate.mutate({ email, password });
  }

  return (
    <Container>
      <Header isMenuOpen={false} />
      <main className="w-full flex-1 h-screen flex justify-center items-center ">
        <div
          className="w-5/12 flex flex-col items-center justify-center p-10  gap-4  h-full text-white bg-emerald-950 rounded-lg
          max-lg:w-5/10  max-sm:w-9/10   "
        >
          <div className="w-full flex  gap-5 items-center justify-center max-sm:flex-col ">
            <img
              src={ImgRegister}
              className="rounded-lg border border-gray-800 shadow-lg  w-1/2 h-90 max-sm:hidden"
              alt="Imagem de cadastro"
            />
            <form
              onSubmit={handleSubmit}
              className=" w-1/2 flex flex-col justify-center gap-5 max-sm:w-full"
            >
              <h1 className="w-full text-2xl text-center font-bold">
                Register
              </h1>
              <label htmlFor="nome">
                Nome completo:
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  className="text-sm px-1 py-2 border ml-1 rounded-md bg-gray-100 text-black w-full"
                  name="name"
                  required
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="text-sm px-1 py-2 border ml-1 rounded-md bg-gray-100 text-black w-full"
                  name="email"
                  required
                />
              </label>
              <label htmlFor="password" className="relative">
                Senha:
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="text-sm px-1 py-2 border ml-1 rounded-md bg-gray-100 text-black w-full"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[56%] text-black text-xl"
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </button>
              </label>
              <input
                type="submit"
                disabled={isPending}
                value={`${isPending ? "Cadastrando..." : "Cadastrar"}`}
                className="w-full mx-auto bg-emerald-950 border-white  text-white border py-2 rounded-md cursor-pointer
              transition duration-900 hover:bg-emerald-800
              "
              />
            </form>
          </div>
          <button
            className="text-white w-full text-center text-sm font-semibold mt-4"
            onClick={() => {
              setShowModalLogin(true);
              navigate("/");
            }}
          >
            Já possui uma conta?{" "}
            <span className="underline transition duration-300 hover:text-blue-400">
              clica aqui
            </span>
          </button>
        </div>
      </main>
      <Footer />
    </Container>
  );
}
