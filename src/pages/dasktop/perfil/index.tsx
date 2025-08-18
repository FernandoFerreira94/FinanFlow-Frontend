import { MdAccountCircle } from "react-icons/md";
import { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { AuthContext } from "../../../context/AuthContext";
import { Label } from "../newExpense/componentsNewExpense/label";
import { Content } from "../../../componentsGlobal/content";

// Componente Perfil
export default function Perfil() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user, changePassword } = context;
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    repeat: false,
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setReapetPasswrod] = useState("");

  // hook para alterar a senha
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      setShowForm(false);
      setNewPassword("");
      setOldPassword("");
      setReapetPasswrod("");
    },
    onError: () => toast.error("Erro ao alterar senha"),
  });

  // função button para alterar a senha
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      return toast.error("As senhas não coincidem.");
    }

    if (oldPassword === newPassword) {
      toast.error("Senha precisar ser diferente da atual");
    }

    const data = {
      oldPassword,
      newPassword,
    };

    mutate(data);
  }

  // verificação da senha old com new
  const verificyPasswordNew = newPassword === repeatPassword;

  return (
    <Content icon={MdAccountCircle} title="Perfil">
      <strong className="text-xl">
        Nome: <span className="font-medium"> {user?.name}</span>
      </strong>
      <strong className="text-xl">
        Email: <span className="font-medium"> {user?.email}</span>
      </strong>

      {!showForm ? (
        <strong className="text-xl">
          Senha:{" "}
          <button
            onClick={() => setShowForm(true)}
            className="font-medium text-xl text-gray-400 transition duration-300 hover:text-gray-600"
          >
            Alterar senha
          </button>
        </strong>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* SENHA ATUAL */}
          <Label htmlFor="oldPassword">
            Senha atual
            <div className="relative w-3/10 max-sm: w-full">
              <input
                type={showPassword.current ? "text" : "password"}
                id="oldPassword"
                placeholder="Digite sua senha atual"
                className="border p-2 rounded-lg block text-lg font-medium w-full pr-10"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              >
                {!showPassword.current ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </Label>

          {/* NOVA SENHA */}
          <Label htmlFor="newPassword">
            Nova senha
            <div className="relative  w-3/10 max-sm:w-full">
              <input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                placeholder="Digite a nova senha"
                className="border p-2 rounded-lg block text-lg font-medium pr-10 w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
              >
                {!showPassword.new ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </Label>

          {/* REPETIR SENHA */}
          <Label htmlFor="repeatPassword">
            Repetir nova senha
            <div className="relative w-3/10 max-sm:w-full">
              <input
                type={showPassword.repeat ? "text" : "password"}
                id="repeatPassword"
                placeholder="Repita a nova senha"
                className={`border-3 p-2 rounded-lg block text-lg font-medium w-full pr-10  ${
                  verificyPasswordNew
                    ? "border focus:border-emerald-500"
                    : "border-red-500 focus:border-red-500"
                }`}
                value={repeatPassword}
                onChange={(e) => setReapetPasswrod(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    repeat: !prev.repeat,
                  }))
                }
              >
                {!showPassword.repeat ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </Label>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="bg-emerald-700 hover:bg-emerald-800 transition px-4 py-2 rounded-lg text-white font-semibold"
            >
              {isPending ? "Alterando..." : "Alterar Senha"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 transition px-4 py-2 rounded-lg text-black font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </Content>
  );
}
