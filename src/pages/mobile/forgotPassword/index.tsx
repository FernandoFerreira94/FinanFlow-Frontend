import { ContentMobile } from "../../../componetsMobile/contentMobile";
import { InputMobile } from "../../../componetsMobile/inputMobile";
import { ButtonMobile } from "../../../componetsMobile/button";
import { useContext } from "react";
import { FooterLink } from "../../../componetsMobile/footerLink";
import { HeaderTimeMobile } from "../../../componetsMobile/headerTimeMobile";
import { AuthContext } from "../../../context/AuthContext";
import { MainMobile } from "../../../componetsMobile/mainMobile";
import { useVerifyUser } from "../../../hook/useVerifyUser";

export function ForgotPasswordMobile() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { isLoadingEmail } = context;

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
      <MainMobile className="hidden max-sm:flex">
        <HeaderTimeMobile />
        <ContentMobile
          title="Verificar usuário"
          subTitle="Digite seu nome completo e-mail que deseja recuperar a senha"
          url="/loginMobile"
        >
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

            <ButtonMobile
              className="bg-primary-green-6 h-14 text-white mt-4"
              type="submit"
              isLoading={isLoadingEmail}
              disabled={isLoadingEmail}
            >
              Verificar
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
