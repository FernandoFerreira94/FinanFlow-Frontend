import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { api } from "../../service/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import ImgRegister from "../../assets/imgRegister.png";

interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

// Função para cadastrar usuário
async function registerUser({ name, email, password }: RegisterUserProps) {
  const reponse = await api.post("/users", {
    name,
    email,
    password,
  });

  return reponse.data;
}

export default function Register() {
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
    },
    onError: (err) => {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Erro ao cadastrar.");
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate({ name, email, password });
  }
  return (
    <div className="min-h-screen flex flex-col ">
      <Header isMenuOpen={false} />
      <main className="w-full flex-1 h-screen flex justify-center items-center ">
        <div
          className="w-5/12 flex items-center justify-center  text-white bg-emerald-950 rounded-lg
          max-lg:w-5/10  max-sm:w-9/10 py-15 px-10 gap-5 "
        >
          <img
            src={ImgRegister}
            className="rounded-lg border border-gray-800 shadow-lg  w-1/2 h-80 "
            alt="Imagem de cadastro"
          />
          <form
            onSubmit={handleSubmit}
            className=" w-1/2 flex flex-col justify-center gap-5 
          "
          >
            <h1 className="w-full text-2xl text-center font-bold">Register</h1>
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                placeholder="Digite seu nome"
                className="text-sm px-1 py-1 border ml-1 rounded-md bg-gray-100 text-black w-full"
                name="name"
                required
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                placeholder="Digite seu email"
                className="text-sm px-1 py-1 border ml-1 rounded-md bg-gray-100 text-black w-full"
                name="email"
                required
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                placeholder="Digite sua senha"
                className="text-sm px-1 py-1 border ml-1 rounded-md bg-gray-100 text-black w-full"
                name="password"
                required
              />
            </label>
            <input
              type="submit"
              value={`${isPending ? "Cadastrando..." : "Cadastrar"}`}
              className="w-full mx-auto bg-emerald-950 border-white  text-white border py-1 rounded-md cursor-pointer
            transition duration-900 hover:bg-emerald-800
            "
            />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
