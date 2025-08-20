import { Container } from "../../componentsDasktop/container";
import { Footer } from "../../componentsDasktop/footer";
import { Header } from "../../componentsDasktop/header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header isMenuOpen={false} />
        <main className="w-full flex flex-col flex-1 ">
          <div className="w-full flex mt-70 flex-col items-center justify-center  h-full gap-6 p-6">
            <h1 className="font-semibold text-4xl text-center">
              Oops... Página não encontrada!
            </h1>

            <motion.button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-primary-green-6 mt-30 text-white rounded-2xl font-medium shadow-lg hover:emerald-800 transition-all"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🔙 Voltar para a Home
            </motion.button>
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
