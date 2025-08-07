import { useContext } from "react";
import { MdEditNote, MdDelete, MdCheckCircle } from "react-icons/md";

import type { CardExpenseProps } from "../../../../types";

import { useDeleteExpense } from "../../../../hook/useDeleteExpense";
import { AuthContext } from "../../../../context/AuthContext";
import { usePaidExpense } from "../../../../hook/usePaidExpense";

// funcao para formatar a data
function parseBRDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/");
  return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
}

// componente para exibir as despesas
export default function CardExpense({
  name = "Nome despesas",
  dataVencimento,
  type,
  amount,
  installmentNumber,
  totalInstallments,
  idExpense,
  paid,
}: CardExpenseProps) {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Auth context is undefined");
  }

  // funcao para formatar a data
  const vencimentoDate = parseBRDate(dataVencimento);
  const isOverdue = vencimentoDate < new Date();

  const { user } = auth;
  // funcao para deletar despesa
  const { mutate: deleteExpense } = useDeleteExpense();
  // funcao para marcar despesa como paga
  const { mutate: paidExpense } = usePaidExpense();

  return (
    <div className="border rounded-lg bg-[#e3e7e2]/20 py-2 px-10 grid grid-cols-6 items-center justify-between ">
      <div className="flex flex-col items-start">
        <p className="font-bold text-xl ">{name}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">Data vencimento</p>
        <p
          className={`text-lg italic font-semibold ${
            isOverdue ? "text-red-600" : "text-gray-500"
          } ${paid && "text-green-600"}`}
        >
          {dataVencimento}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">
          {type === "INSTALLMENT" ? "Parcelado" : "Fixa"}
        </p>
        {installmentNumber && (
          <p className="text-lg italic">
            {installmentNumber} / {totalInstallments}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center">
        {paid ? (
          <span className="flex items-center gap-2 text-xl text-green-600 font-bold">
            Pago <MdCheckCircle />
          </span>
        ) : (
          <button
            className={`font-bold text-xl ${
              isOverdue ? "text-red-600 hover:text-red-600" : ""
            }
          transition hover:text-emerald-600 duration-300`}
            onClick={() => {
              if (idExpense && user?.token) {
                paidExpense({ idExpense, token: user.token });
              }
            }}
          >
            Pagar
          </button>
        )}
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-lg"> Valor</p>
        <p className="text-md">{amount} R$</p>
      </div>
      <div className="flex justify-end gap-2 items-center ">
        <MdEditNote size={35} className="cursor-pointer" />
        <button
          onClick={() => {
            if (idExpense && user?.token) {
              deleteExpense({ idExpense, token: user.token });
            }
          }}
        >
          <MdDelete size={35} className="cursor-pointer  text-red-600 " />
        </button>
      </div>
    </div>
  );
}
