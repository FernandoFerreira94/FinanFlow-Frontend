import { useContext, useState } from "react";
import { ContentMobile } from "../../../componetsMobile/contentMobile";
import { InputMobile } from "../../../componetsMobile/inputMobile";
import { ButtonMobile } from "../../../componetsMobile/button";
import { FooterLink } from "../../../componetsMobile/footerLink";
import { HeaderTimeMobile } from "../../../componetsMobile/headerTimeMobile";
import { MainMobile } from "../../../componetsMobile/mainMobile";
import { AuthContext } from "../../../context/AuthContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useChangePassword } from "../../../hook/useChangePassword";
import { useNavigate } from "react-router-dom";

export function ChangePasswordMobile() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { isLoadingEmail, forgotPassword } = context;

  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // mensagem de erro

  const { mutate } = useChangePassword();

  // onChange do campo NEW PASSWORD
  function handleNewPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewPassword(value);

    // Se o campo password já tiver algo, verifica se são diferentes
    if (password && value !== password) {
      setError("As senhas precisam ser iguais");
    } else {
      setError("");
    }
  }

  // onChange do campo PASSWORD (principal)
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);

    // validação em tempo real
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
          navigate("/loginMobile");
        },
      }
    );
  }

  const newPasswordClass = error ? "border-red-500" : "";

  return (
    <MainMobile>
      <HeaderTimeMobile />
      <ContentMobile
        title="Alterar senha"
        subTitle="Digite sua senha nova"
        url="/loginMobile"
      >
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <InputMobile
              label="Senha nova"
              type={showNewPassword ? "text" : "password"}
              placeholder="Digite sua senha nova"
              className={`relative border-2 ${newPasswordClass}`}
              name="newPassword"
              required
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <span
              className="absolute top-14 right-5 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <IoMdEye size={20} />
              ) : (
                <IoMdEyeOff size={20} />
              )}
            </span>
          </div>

          <div className="relative w-full">
            <InputMobile
              label="Repita a senha"
              type={showPassword ? "text" : "password"}
              placeholder="Repita a senha"
              className="relative"
              name="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              className="absolute top-14 right-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </span>
            {/* mensagem de erro abaixo do campo password */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <ButtonMobile
            className="bg-primary-green-6 h-14 text-white mt-4"
            type="submit"
            isLoading={isLoadingEmail}
            disabled={isLoadingEmail}
          >
            Alterar senha
          </ButtonMobile>
        </form>

        <FooterLink
          text="ou"
          link="Voltar para acesso login"
          url="/loginMobile"
        />
      </ContentMobile>
    </MainMobile>
  );
}
