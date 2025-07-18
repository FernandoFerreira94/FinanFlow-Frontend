import { api } from "./service/api";

function App() {
  async function handleSubmit(formData: FormData) {
    const data = {
      name: formData.get("name"),

      email: formData.get("email"),

      password: formData.get("password"),
    };

    const response = await api.post("users", data);
    console.log(response.data);
    return response.data;
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-5">
      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border "
          type="text"
          name="name"
          id="name"
          placeholder="Digite seu nome"
        />
        <input
          className="border "
          type="text"
          name="email"
          id="email"
          placeholder="Digite seu email"
        />
        <input
          className="border "
          type="text"
          name="password"
          id="password"
          placeholder="Digite sua senha"
        />
        <input type="submit" value="Enviar" className="border bg-green-300" />
      </form>
    </main>
  );
}

export default App;
