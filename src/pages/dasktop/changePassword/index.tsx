import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ChangePasswordMobile } from "../../mobile/changePasswordMobile";

export default function ChangePassword() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { forgotPassword } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!forgotPassword) {
      navigate("/"); // redireciona se forgotPassword for null ou undefined
    }
  }, [forgotPassword, navigate]);

  if (!forgotPassword) return null; // renderiza nada enquanto redireciona

  return (
    <>
      <main className="max-sm:hidden">
        <h1>ChangePassword</h1>
      </main>
      <ChangePasswordMobile />
    </>
  );
}
