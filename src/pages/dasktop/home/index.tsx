import { Link } from "react-router-dom";
import { Container } from "../../../componentsGlobal/container";

import LogoBody from "../../../assets/logoBody.png";
import ImgFluxo from "../../../assets/imgBody.png";
import { Header } from "../../../componentsGlobal/header";
import { Footer } from "../../../componentsGlobal/footer";
import { HomeMobile } from "../../mobile/home";

// Componente Home
export default function Home() {
  return (
    <>
      <Container className="max-sm:hidden">
        <Header isMenuOpen={true} />
        <main className="w-full flex flex-col flex-1 max-sm:mt-10">
          <div className="container  mx-auto flex flex-col ">
            <div
              className="w-full flex justify-center items-center h-70 
          max-sm:h-60"
            >
              <img
                src={LogoBody}
                alt="LogoBody"
                className="object-cover h-40 max-sm:h-30"
              />
            </div>
            <div
              className="flex mt-5 
          max-sm:flex-col  max-sm:items-center max-sm:gap-10 max-sm:mt-0"
            >
              <div className="w-5/10 max-sm:w-full">
                <img
                  src={ImgFluxo}
                  alt="Imagem do fluxo de gastos"
                  className="w-7/10 mx-auto object-cover rounded-lg  shadow-lg border border-gray-200 
                max-sm:w-9/10
                "
                />
              </div>
              <section
                className="w-5/10 flex flex-col  items-center justify-around 
            max-sm:w-9/10 max-sm:gap-5
            "
              >
                <h1 className="text-4xl font-semibold   text-center">
                  Organize suas finanças mensais com inteligência
                </h1>
                <p className="text-lg  text-gray-600 bg-gray-100  p-5 rounded-xl shadow-lg">
                  Você já perdeu uma conta por esquecimento ou deixou de pagar
                  algo no vencimento? O Dev Finas foi criado exatamente para
                  resolver isso. Aqui, você registra seus gastos fixos,
                  parcelados e avulsos, todos com suas datas certas para
                  pagamento. Categorize, visualize e filtre com facilidade tudo
                  o que você precisa pagar no mês — sem complicação, sem
                  distrações. Um painel claro e direto pra você manter o
                  controle.
                </p>
              </section>
            </div>
            <article className="w-full text-center mt-20 mb-10 flex flex-col items-center gap-2 ">
              <h2 className="font-bold text-2xl font-sans">
                Tenha o controle financeiro que você merece
              </h2>
              <p
                className="text-sm font-normal mt-5 italic text-gray-700
            max-sm:w-9/10
            "
              >
                Comece agora mesmo a organizar suas contas com praticidade e
                clareza.
              </p>
              <Link
                to={"/register"}
                className="mt-4 px-4 py-2 border rounded-lg bg-emerald-950 text-white font-sans 
            transition duration-900 hover:bg-emerald-800 lora tracking-wider
            max-sm:w-9/10
            "
              >
                Criar minha conta gratuitamente
              </Link>
            </article>
          </div>
        </main>
        <Footer />
      </Container>
      <HomeMobile />
    </>
  );
}
