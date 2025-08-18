import { useContext, useState } from "react";
import { MdDelete, MdCheckCircle } from "react-icons/md";
import type { CardExpenseProps } from "../../../../../types";
import { useDeleteExpense } from "../../../../../hook/useDeleteExpense";
import { AuthContext } from "../../../../../context/AuthContext";
import { usePaidExpense } from "../../../../../hook/usePaidExpense";

function parseBRDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/");
  return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
}

export default function CardExpense({
  name,
  dataVencimento,
  type,
  amount,
  installmentNumber,
  totalInstallments,
  idExpense,
  paid,
  paymentDate,
}: CardExpenseProps) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context is undefined");
  const { user } = context;

  const vencimentoDate = parseBRDate(dataVencimento);
  const isOverdue = vencimentoDate < new Date();

  const { mutate: deleteExpense } = useDeleteExpense();
  const { mutate: paidExpense } = usePaidExpense();

  // Estado local só para este card
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    if (!idExpense || !user?.token) return;
    setIsPaying(true);
    paidExpense(
      { idExpense, token: user.token },
      {
        onSettled: () => {
          setIsPaying(false); // sempre desativa ao final
        },
      }
    );
  };

  return (
    <div className="border rounded-lg bg-[#e3e7e2]/20 py-3  px-5 grid grid-cols-6 items-center gap-2 max-sm:grid-cols-2 max-sm:gap-3 max-sm:p-3">
      {/* Nome */}
      <div className="w-full max-sm:col-span-2">
        <p className="font-bold text-xl max-sm:text-lg">{name}</p>
      </div>

      {/* Data vencimento */}
      <div className="flex flex-col items-center max-sm:items-start max-sm:order-1">
        <p className="font-bold text-lg max-sm:text-sm">Data vencimento</p>
        <p
          className={`text-lg italic font-semibold max-sm:text-sm ${
            isOverdue ? "text-red-600" : "text-gray-500"
          } ${paid && "text-green-600"}`}
        >
          {dataVencimento}
        </p>
      </div>

      {/* Tipo */}
      <div className="flex flex-col items-center max-sm:items-start max-sm:order-2">
        <p className="font-bold text-lg max-sm:text-sm">
          {type === "INSTALLMENT" ? "Parcelado" : "Fixa"}
        </p>
        {installmentNumber && (
          <p className="text-lg italic max-sm:text-sm">
            {installmentNumber} / {totalInstallments}
          </p>
        )}
      </div>

      {/* Pago ou botão pagar */}
      <div className="flex flex-col items-center max-sm:items-start max-sm:order-4">
        {paid ? (
          <>
            <span className="flex items-center gap-1 text-xl text-emerald-600 font-bold max-sm:text-base">
              Pago <MdCheckCircle size={18} />
            </span>
            <span className="text-lg font-semibold italic max-sm:text-sm">
              {paymentDate}
            </span>
          </>
        ) : (
          <button
            className={`px-4 py-1 rounded-md text-white font-bold max-sm:text-sm transition duration-300 ${
              isOverdue
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-700 hover:bg-emerald-600"
            }, `}
            onClick={handlePay}
            disabled={isPaying}
          >
            {isPaying ? "Pagando..." : "Pagar"}
          </button>
        )}
      </div>

      {/* Valor */}
      <div className="flex flex-col items-center max-sm:items-start max-sm:order-3">
        <p className="font-bold text-lg max-sm:text-sm">Valor</p>
        <p className="text-md max-sm:text-sm">{amount} R$</p>
      </div>

      {/* Ações */}
      <div className="flex justify-center gap-2 items-center max-sm:justify-center max-sm:col-span-2 max-sm:order-5 max-sm:hidden">
        <button
          onClick={() => {
            if (idExpense && user?.token) {
              deleteExpense({ idExpense, token: user.token });
            }
          }}
        >
          <MdDelete
            size={35}
            className="cursor-pointer text-red-600 max-sm:size-6"
          />
        </button>
      </div>
    </div>
  );
}
