import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Header } from "../../../componentsDasktop/header";
import { Footer } from "../../../componentsDasktop/footer";
import { Container } from "../../../componentsDasktop/container";
import { AuthContext } from "../../../context/AuthContext";
import { useRegister } from "../../../hook/useRegister";
import { ButtonMobile } from "../../../componetsMobile/button";
import RegisterMobile from "../../mobile/registerMobile";

export default function Register() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setShowModalLogin, isLoadingEmail } = context;

  const [showPassword, setShowPassword] = useState(false);

  // Hook de cadastro
  const registerMutation = useRegister();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Dispara o hook corretamente
    registerMutation.mutate({ name, email, password });
  }

  return (
    <>
      <Container className="max-sm:hidden">
        <Header isMenuOpen={false} />
        <main className="w-full flex-1 h-screen flex justify-center items-center ">
          <div className="w-4/12 flex flex-col items-center justify-center shadow-google p-10  text-white bg-primary-green-6 rounded-lg max-lg:w-7/10 ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center gap-5 "
            >
              <h1 className="w-full text-3xl  text-center font-bold">
                Cadastrar
              </h1>
              <label htmlFor="email" className="text-white ">
                Nome completo
                <input
                  id="text"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome completo"
                  className="w-full h-14 mt-1  px-2 bg-gray-100 text-black rounded-lg"
                  required
                />
              </label>

              <label htmlFor="email" className="text-white">
                E-mail
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  className="w-full h-14 mt-1  px-2 bg-gray-100 text-black rounded-lg"
                  required
                />
              </label>

              <div className="relative">
                <label htmlFor="password" className="text-white">
                  Senha
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Digite sua senha"
                    className="w-full h-14 mt-1  px-2 bg-gray-100 text-black rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-[58%] text-gray-800 "
                  >
                    {showPassword ? (
                      <IoMdEye size={23} />
                    ) : (
                      <IoMdEyeOff size={23} />
                    )}
                  </button>
                </label>
              </div>

              <ButtonMobile
                type="submit"
                className="bg-emerald-700 h-12 hover:bg-emerald-800 transition rounded-sm text-lg text-white py-2 mt-2 cursor-pointer "
                isLoading={isLoadingEmail}
              >
                Criar conta
              </ButtonMobile>
            </form>

            <button
              className="text-white w-full text-center  font-sans font-semibold mt-5"
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
      <RegisterMobile />
    </>
  );
}
