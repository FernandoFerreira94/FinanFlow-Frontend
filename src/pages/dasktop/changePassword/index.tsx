import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { AuthContext } from "../../../context/AuthContext";
import { ChangePasswordMobile } from "../../mobile/changePasswordMobile";
import { ButtonMobile } from "../../../componetsMobile/button";
import { Container } from "../../../componentsDasktop/container";
import { Header } from "../../../componentsDasktop/header";
import { Footer } from "../../../componentsDasktop/footer";
import { useChangePassword } from "../../../hook/useChangePassword";

// Componente ChangePassword
export default function ChangePassword() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { forgotPassword, setShowModalLogin, isLoadingEmail } = context;
  const navigate = useNavigate();

  const { mutate } = useChangePassword();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!forgotPassword) {
      navigate("/"); // redireciona se forgotPassword for null ou undefined
    }
  }, [forgotPassword, navigate]);

  if (!forgotPassword) return null;

  // validação em tempo real
  function handleNewPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewPassword(value);

    if (password && value !== password) {
      setError("As senhas precisam ser iguais");
    } else {
      setError("");
    }
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);

    if (newPassword && value !== newPassword) {
      setError("As senhas precisam ser iguais");
    } else {
      setError("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== password) {
      setError("As senhas precisam ser iguais");
      return;
    }
    setError("");

    if (!forgotPassword) {
      setError("Informações do usuário não encontradas");
      return;
    }

    mutate(
      { user_id: forgotPassword?.id, newPassword },
      {
        onSuccess: () => {
          navigate("/");
          setShowModalLogin(true);
        },
      }
    );
  }

  return (
    <>
      <Container className="max-sm:hidden">
        <Header isMenuOpen={false} />
        <main className="w-full flex-1 h-screen flex justify-center items-center ">
          <div className="w-4/12 flex flex-col items-center justify-center shadow-google p-10  text-white bg-primary-green-6 rounded-lg max-lg:w-7/10 ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center gap-5 "
            >
              <h1 className="w-full text-3xl  text-center font-bold">
                Alterar senha
              </h1>
              <span className="text-gray-300 font-sans font-semibold text-lg w-3/5 my-3">
                Digite sua senha nova
              </span>

              {/* Campo senha nova */}
              <div className="relative w-full">
                <label htmlFor="newPassword" className="text-white ">
                  Senha nova
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Digite sua senha nova"
                    className={`w-full h-14 mt-1 font-sans text-lg px-2 bg-gray-100 text-black rounded-lg ${
                      error ? "border-2 border-red-500" : ""
                    }`}
                    required
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                </label>
                <span
                  className="absolute top-12 right-5 cursor-pointer text-black"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <IoMdEye size={22} />
                  ) : (
                    <IoMdEyeOff size={22} />
                  )}
                </span>
              </div>

              {/* Campo repetir senha */}
              <div className="relative w-full">
                <label htmlFor="password" className="text-white">
                  Repita a senha
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Repita a senha nova"
                    className="w-full h-14 mt-1 font-sans text-lg px-2 bg-gray-100 text-black rounded-lg"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
                <span
                  className="absolute top-12 right-5 cursor-pointer text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEye size={22} />
                  ) : (
                    <IoMdEyeOff size={22} />
                  )}
                </span>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <ButtonMobile
                type="submit"
                className="bg-emerald-700 h-12 hover:bg-emerald-800 transition rounded-sm text-lg text-white py-2 mt-2 cursor-pointer "
                isLoading={isLoadingEmail}
                disabled={isLoadingEmail}
              >
                Alterar senha
              </ButtonMobile>
            </form>

            <button
              className="text-white w-full text-center  font-sans font-semibold mt-5"
              onClick={() => {
                setShowModalLogin(true);
                navigate("/");
              }}
            >
              Já possui uma conta?{" "}
              <span className="underline transition duration-300 hover:text-blue-400">
                clica aqui
              </span>
            </button>
          </div>
        </main>
        <Footer />
      </Container>
      <ChangePasswordMobile />
    </>
  );
}
