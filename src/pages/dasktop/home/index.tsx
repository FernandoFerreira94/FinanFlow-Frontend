import { Link } from "react-router-dom";
import { Container } from "../../../componentsDasktop/container";

import LogoBody from "../../../assets/logoBody-removebg-preview.png";
import ImgFluxo from "../../../assets/imgBody.png";
import { Header } from "../../../componentsDasktop/header";
import { Footer } from "../../../componentsDasktop/footer";
import { HomeMobile } from "../../mobile/homeMobile";

// Componente Home
export default function Home() {
  return (
    <>
      <Container className="max-sm:hidden">
        <Header isMenuOpen={true} />
        <main className="w-full flex flex-col flex-1">
          <div className="container mx-auto flex flex-col ">
            <div
              className="w-full flex justify-center items-center h-70 
          "
            >
              <img
                src={LogoBody}
                alt="LogoBody"
                className="object-cover h-40 "
              />
            </div>
            <div
              className="flex mt-3 items-betwen 
         "
            >
              <div className="w-5/10 ">
                <img
                  src={ImgFluxo}
                  alt="Imagem do fluxo de gastos"
                  className="w-7/10 mx-auto object-cover rounded-lg  shadow-google border border-gray-200 
               
                "
                />
              </div>
              <section
                className="w-5/10 flex flex-col  items-center justify-around 
          
            "
              >
                <h1 className="text-4xl font-semibold font-sans  text-center">
                  Organize suas finanças mensais com inteligência
                </h1>
                <p className="text-lg  text-gray-900 bg-gray-100/60 w-8/10  p-5 rounded-lg shadow-google">
                  Você já perdeu uma conta por ter esquecimento ou deixou de
                  pagar algo no vencimento? O Finan Flow foi criado exatamente
                  para resolver isso. Aqui, você registra seus gastos fixos,
                  parcelados e avulsos, todos com suas datas certas para
                  pagamento. Categorize, visualize e filtre com facilidade tudo
                  o que você precisa pagar no mês — sem complicação, sem
                  distrações. Um painel claro e direto pra você manter o
                  controle.
                </p>
              </section>
            </div>
            <article className="w-full text-center mt-20 mb-20 flex flex-col items-center gap-2 ">
              <h2 className="font-semibold text-2xl font-sans">
                Tenha o controle financeiro que você merece
              </h2>
              <p
                className="text-sm font-normal mt-5 italic text-gray-700
           
            "
              >
                Comece agora mesmo a organizar suas contas com praticidade e
                clareza.
              </p>
              <Link
                to={"/register"}
                className="mt-4 h-12 w-3/10 flex items-center justify-center border-2 border-transparent rounded-lg bg-emerald-800 text-white font-semibold font-sans 
            transition duration-900  hover:scale-105 tracking-wider
            
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
