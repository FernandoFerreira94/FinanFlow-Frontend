import { ContentMobile } from "../../componetsMobile/contentMobile";
import { InputMobile } from "../../componetsMobile/inputMobile";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { ButtonMobile } from "../../componetsMobile/button";
import { Link } from "react-router-dom";
import IconGoogle from "../../assets/iconGoogle.png";
import { useLoginGoogle } from "../../hook/useLoginGoogle";

export default function LoginMobile() {
  const [showPassword, setShowPassword] = useState(false);

  const login = useLoginGoogle();

  return (
    <>
      <main className="w-screen h-dvh">
        <header className="w-full h-[48px] bg-primary-green-6"></header>
        <ContentMobile title="Acessar" subTitle="E-mail e senha">
          <form className="w-full flex flex-col">
            <InputMobile
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              required
            />
            <button className="relative w-full text-start">
              <InputMobile
                label="Senha"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="relative"
                name="password"
                required
              />
              <span
                className="absolute top-14 right-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
                {showPassword ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </span>
            </button>
            <Link to={"#"} className="w-full text-end py-5 ">
              Esqueci minha senha
            </Link>
            <ButtonMobile className="bg-primary-green-6 text-white ">
              Acessar
            </ButtonMobile>
          </form>
          <Link to={"/register"}>
            <ButtonMobile className="border-green-6  text-green-6 mt-5">
              Cadastrar
            </ButtonMobile>
          </Link>
          <div className="w-full flex items-center gap-2 text-gray-400 mt-7">
            <hr className="flex-1 border-gray-400" />
            <span className="whitespace-nowrap px-2">ou continue com</span>
            <hr className="flex-1 border-gray-400" />
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 mt-5 "
            onClick={() => login()}
          >
            <img
              src={IconGoogle}
              className="w-12 border p-1 rounded-lg shadow-google"
              alt="icon google"
            />
          </button>
        </ContentMobile>
      </main>
    </>
  );
}
