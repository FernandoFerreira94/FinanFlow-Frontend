import { MainMobile } from "../../../componetsMobile/mainMobile";
import { HeaderDashboard } from "../../../componetsMobile/headerDashboard";
import { FooterMenu } from "../../../componetsMobile/footerMenu";
import { TitleDashboard } from "../../../componetsMobile/TitleDashboard";
import { MdAccountCircle } from "react-icons/md";
import { useContext, useState, useMemo } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { AuthContext } from "../../../context/AuthContext";
import { ButtonMobile } from "../../../componetsMobile/button";
import { InputMobile } from "../../../componetsMobile/inputMobile";
import { useChangePasswordUser } from "../../../hook/useChangePasswordUser";

export default function ChangePasswordUser() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");

  const { isLoadingEmail } = context;

  const navigate = useNavigate();
  const { mutate } = useChangePasswordUser();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    repeat: false,
  });

  // verifica se as senhas batem
  const passwordMatch = useMemo(
    () => newPassword === repeatPassword,
    [newPassword, repeatPassword]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!passwordMatch) {
      return toast.error("As senhas não coincidem.");
    }

    if (oldPassword === newPassword) {
      return toast.error("Senha precisa ser diferente da atual");
    }

    mutate({ oldPassword, newPassword });
  }

  function handleBack() {
    navigate("/user");
  }

  return (
    <MainMobile className="hidden max-sm:flex flex-col min-h-screen">
      <HeaderDashboard />

      <div className="flex-1 w-full px-5 flex flex-col gap-5 mt-4">
        <section className="w-full flex items-center py-4">
          <TitleDashboard title="Perfil" icon={<MdAccountCircle size={35} />} />
        </section>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 border border-gray-200 hover:shadow-lg transition"
        >
          <div className="relative">
            <InputMobile
              label="Senha Atual"
              placeholder="Digite sua senha atual"
              type={showPassword.current ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              showToggle={() =>
                setShowPassword((prev) => ({ ...prev, current: !prev.current }))
              }
              showPassword={showPassword.current}
              required
            />
            {showPassword.current ? (
              <IoMdEye
                className="absolute right-5 top-16 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={23}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              />
            ) : (
              <IoMdEyeOff
                className="absolute right-5 top-16 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={23}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              />
            )}
          </div>

          <div className="relative">
            <InputMobile
              label="Nova Senha"
              placeholder="Digite sua nova senha"
              type={showPassword.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showToggle={() =>
                setShowPassword((prev) => ({ ...prev, new: !prev.new }))
              }
              showPassword={showPassword.new}
              required
            />
            {showPassword.new ? (
              <IoMdEye
                className="absolute right-5 top-16 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={23}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
              />
            ) : (
              <IoMdEyeOff
                className="absolute right-5 top-16 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={23}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
              />
            )}
          </div>
          <div className="relative">
            <InputMobile
              label="Repetir Senha"
              placeholder="Repita sua nova senha"
              type={showPassword.repeat ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              showToggle={() =>
                setShowPassword((prev) => ({ ...prev, repeat: !prev.repeat }))
              }
              showPassword={showPassword.repeat}
              required
              className={`border-2 ${
                !passwordMatch
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              // o restante props do seu InputMobile
            />
            {showPassword.repeat ? (
              <IoMdEye
                className="absolute right-5 top-16 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={23}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    repeat: !prev.repeat,
                  }))
                }
              />
            ) : (
              <IoMdEyeOff
                className="absolute right-5 top-16 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={23}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    repeat: !prev.repeat,
                  }))
                }
              />
            )}
          </div>
          {!passwordMatch && repeatPassword && (
            <p className="text-red-500 text-sm">
              A senha precisa ser igual à nova senha
            </p>
          )}

          <ButtonMobile
            type="submit"
            className="w-full bg-primary-green-6 h-12 text-white"
            disabled={isLoadingEmail}
          >
            {isLoadingEmail ? "Alterando..." : "Alterar Senha"}
          </ButtonMobile>
        </form>
        <ButtonMobile
          type="button"
          className="w-full border-2 border-primary-green-6 h-12 text-input font-semibold"
          onClick={handleBack}
        >
          Voltar
        </ButtonMobile>
      </div>

      <FooterMenu className="sticky bottom-0 w-full" />
    </MainMobile>
  );
}
