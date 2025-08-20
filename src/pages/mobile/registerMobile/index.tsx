import { ContentMobile } from "../../../componetsMobile/contentMobile";
import { InputMobile } from "../../../componetsMobile/inputMobile";
import { ButtonMobile } from "../../../componetsMobile/button";
import { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FooterLink } from "../../../componetsMobile/footerLink";
import { HeaderTimeMobile } from "../../../componetsMobile/headerTimeMobile";
import { AuthContext } from "../../../context/AuthContext";
import { useRegister } from "../../../hook/useRegister";
import { MainMobile } from "../../../componetsMobile/mainMobile";

export default function RegisterMobile() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { isLoadingEmail } = context;

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
      <MainMobile className="w-screen h-dvh ">
        <HeaderTimeMobile />
        <ContentMobile title="Cadastrar" subTitle="" url="/loginMobile">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputMobile
              label="Nome completo"
              type="text"
              placeholder="Digite seu nome"
              name="name"
              required
            />
            <InputMobile
              label="E-mail"
              type="text"
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

            <ButtonMobile
              className="bg-primary-green-6 h-14 text-white mt-4"
              type="submit"
              isLoading={isLoadingEmail}
              disabled={isLoadingEmail}
            >
              Cadastrar
            </ButtonMobile>
          </form>
          <FooterLink
            text="ou"
            link="Voltar para acesso login"
            url="/loginMobile"
          />
        </ContentMobile>
      </MainMobile>
    </>
  );
}
