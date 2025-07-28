import { toast } from "sonner";
import { api } from "../../service/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface LoginUserProps {
  email: string;
  password: string;
}
async function loginUser({ email, password }: LoginUserProps) {
  const response = await api.post("/session", {
    email,
    password,
  });
  return response.data;
}
export default function ModalLogin() {
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
    },
    onError: (err) => {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Erro ao cadastrar.");
      console.log(error);
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate({ email, password });
  }

  return (
    <div className=" border border-black fixed top-16   p-8 rounded-lg  bg-emerald-950">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-white w-full text-center text-xl font-semibold">
          Login
        </h1>
        <label
          htmlFor="email"
          className="text-white w-full text-sm font-semibold"
        >
          {" "}
          Email:
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            className=" bg-gray-100 text-black rounded-md ml-2 px-1 py-0.5 font-normal"
            required
          />
        </label>
        <label
          htmlFor="password"
          className="text-white w-full  text-sm font-semibold "
        >
          {" "}
          Senha:
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className=" bg-gray-100 text-black rounded-md ml-2 px-1 py-0.5 font-normal"
            required
          />
        </label>
        <input
          type="submit"
          value={`${isPending ? "Entrando..." : "Entrar"}`}
          className=" rounded-md bg-emerald-950 text-white border py-0.5 cursor-pointer text-sm tracking-wider
          transition duration-500 hover:bg-emerald-800 "
        />
      </form>
    </div>
  );
}
