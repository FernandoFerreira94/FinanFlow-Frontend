import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import IconGoogle from "../../../../../assets/iconGoogle.png";
import { useLoginGoogle } from "../../../../../hook/useLoginGoogle";

import { AuthContext } from "../../../../../context/AuthContext";
import { ButtonMobile } from "../../../../../componetsMobile/button";
import { useLoginEmail } from "../../../../../hook/useLoginEmail";

// modal de login
export function ModalLogin() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setShowModalLogin } = context;
  const [showPassword, setShowPassword] = useState(false);

  const login = useLoginGoogle();
  const { mutate } = useLoginEmail();

  // funçao button para logar o usuario
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate({ email, password });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm  flex items-center justify-center ">
      <div className="relative bg-emerald-950 py-10 h-100 px-10 rounded-lg min-w-[400px] max-w-[90%] w-2/10 z-50 flex flex-col items-center justify-center">
        <button
          onClick={() => setShowModalLogin(false)}
          className="absolute border border-transparent top-5 right-5 rounded-lg text-red-500 "
        >
          <IoClose size={35} />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <h1 className="text-white w-full text-center text-2xl font-semibold">
            Login
          </h1>
          <label htmlFor="email" className="text-white ">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              className="w-full mt-1 px-2 h-10 bg-gray-100 text-black rounded"
              required
            />
          </label>
          <label htmlFor="password" className="text-white  relative">
            Senha:
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 px-2 h-10 bg-gray-100 border border-red-50 text-black rounded "
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[56%] text-black text-xl"
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </label>{" "}
          <input
            type="submit"
            value="Entrar"
            disabled={true}
            className="bg-emerald-700 hover:bg-emerald-800 transition text-sm rounded-sm text-md text-white py-2 mt-2 cursor-pointer "
          />
        </form>

        <div className="mt-5 w-full">
          <ButtonMobile
            onClick={() => login()}
            className="w-full py-2 bg-white border rounded-lg text-lg font-semibold relative flex items-center justify-center"
          >
            <img
              src={IconGoogle}
              className="w-8 absolute top-1/2 left-3 -translate-y-1/2"
              alt="icon google"
            />
            Entrar com Google
          </ButtonMobile>
        </div>

        <button
          className="text-white w-full text-center text-sm font-semibold mt-5"
          onClick={() => {
            setShowModalLogin(false);
            navigate("/register");
          }}
        >
          Não possui uma conta?{" "}
          <span className="underline transition duration-300 hover:text-blue-400">
            clica aqui
          </span>
        </button>
      </div>
    </div>
  );
}
