import { useEffect, useState, useContext } from "react";
import Logo from "../../../assets/logoHeader-removebg-preview.png";
import ImgMobile from "../../../assets/img-home-mobile.png";
import IconGoogle from "../../../assets/iconGoogle.png";
import { Link } from "react-router-dom";
import { useLoginGoogle } from "../../../hook/useLoginGoogle";
import { AuthContext } from "../../../context/AuthContext";
import { ButtonMobile } from "../../../componetsMobile/button";
import { MainMobile } from "../../../componetsMobile/mainMobile";

export function HomeMobile() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { isLoadingGoogle } = context;

  const [showContent, setShowContent] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);

  const login = useLoginGoogle();

  // funcao verificar horario
  function time() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 6 && hours < 12) {
      return "Bom dia"; // 06:00 até 11:59
    } else if (hours >= 12 && hours < 18) {
      return "Boa tarde"; // 12:00 até 17:59
    } else {
      return "Boa noite"; // 18:00 até 05:59
    }
  }

  // animação splash do logo
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateLogo(true); // inicia a animação do logo
      setTimeout(() => {
        setShowContent(true); // mostra o conteúdo depois da animação
      }, 100); // tempo da animação (ms)
    }, 2000); // delay inicial de 2s

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainMobile className=" bg-primary-green-6 justify-center flex-row">
      <main className="flex flex-col items-center">
        {/* Logo */}
        <div
          className={`transition-all duration-900 ease-out w-full flex justify-center ${
            animateLogo ? "mt-3" : "mt-[70%]"
          }`}
        >
          <img src={Logo} alt="logo" className="w-8/10" />
        </div>

        {/* Conteúdo aparece depois */}
        <div
          className={`transition-opacity duration-2000 ease-out w-full flex flex-col items-center px-5 ${
            showContent ? "opacity-100 mt-5" : "opacity-0"
          }`}
        >
          <img
            src={ImgMobile}
            className="w-[258px] h-[264px] object-cover mt-2"
            alt=""
          />
          <h1 className="mt-5 h-[64px] text-3xl text-white font-semibold">
            Olá {time()}
          </h1>
          <p className="h-[64px] text-lg text-white">Como deseja continuar?</p>
          <div className="flex flex-col gap-6 w-full">
            {/* Botão Google estilizado */}
            <ButtonMobile
              onClick={() => login()}
              className="w-full h-14 bg-white border rounded-lg text-lg font-semibold relative flex items-center justify-center"
              isLoading={isLoadingGoogle}
            >
              <img
                src={IconGoogle}
                className="absolute top-1/2 left-3 -translate-y-1/2"
                alt="icon google"
              />
              Entrar com Google
            </ButtonMobile>

            {/* Outro botão */}
            <Link to={"/loginMobile"}>
              <ButtonMobile className="w-full h-14 bg-transparent border border-green-1 text-green-1 rounded-lg text-lg font-semibold ">
                Outras formas
              </ButtonMobile>
            </Link>
          </div>
        </div>
      </main>
    </MainMobile>
  );
}
