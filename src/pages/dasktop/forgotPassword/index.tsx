import { ForgotPasswordMobile } from "../../mobile/forgotPasswordMobile";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../../componentsDasktop/header";
import { Footer } from "../../../componentsDasktop/footer";
import { Container } from "../../../componentsDasktop/container";
import { AuthContext } from "../../../context/AuthContext";
import { useVerifyUser } from "../../../hook/useVerifyUser";
import { ButtonMobile } from "../../../componetsMobile/button";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { setShowModalLogin, isLoadingEmail } = context;

  // Hook de cadastro
  const { mutate } = useVerifyUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    mutate({ name, email });
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
                Verificar usuário
              </h1>
              <span className="text-gray-300 font-sans font-semibold text-lg w-3/5 my-3">
                Digite seu nome completo e-mail que deseja recuperar a senha
              </span>
              <label htmlFor="email" className="text-white ">
                Nome completo
                <input
                  id="text"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome completo"
                  className="w-full h-14 mt-1 font-sans text-lg px-2 bg-gray-100 text-black rounded-lg"
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
                  className="w-full h-14 mt-1 font-sans text-lg px-2 bg-gray-100 text-black rounded-lg"
                  required
                />
              </label>

              <ButtonMobile
                type="submit"
                className="bg-emerald-700 h-12 hover:bg-emerald-800 transition rounded-sm text-lg text-white py-2 mt-2 cursor-pointer "
                isLoading={isLoadingEmail}
              >
                Veririficar
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
      <ForgotPasswordMobile />
    </>
  );
}
