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

  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    if (!idExpense || !user?.token) return;
    setIsPaying(true);
    paidExpense(
      { idExpense, token: user.token },
      {
        onSettled: () => {
          setIsPaying(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!idExpense) return;
    deleteExpense(idExpense);
  };

  return (
    <div
      className={`w-90 bg-white border-l-4 shadow-[2px_2px_10px_1px_rgb(0,0,0,0.2)] rounded-lg  p-5 gap-3 flex flex-col transition duration-500 hover:shadow-[5px_5px_20px_2px_rgb(0,0,0,0.4)] ${
        paid
          ? "border-green-600/60"
          : isOverdue
          ? "border-red-600/60 "
          : "border-gray-600/60"
      } `}
    >
      {/* Nome */}
      <div className="flex justify-between items-center ">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
        {paid ? (
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            Pago <MdCheckCircle size={18} />
          </div>
        ) : isOverdue ? (
          <span className="text-red-600 font-semibold">Vencido</span>
        ) : (
          <span className="text-gray-500 font-semibold">Pendente</span>
        )}
      </div>

      <div className="flex  justify-between">
        <div className="mb-2">
          <p className="font-bold text-sm text-gray-600">Data vencimento</p>
          <p
            className={`text-base italic font-semibold ${
              isOverdue ? "text-red-600" : "text-gray-500"
            } ${paid && "text-green-600"}`}
          >
            {dataVencimento}
          </p>
        </div>

        {/* Tipo */}
        <div className="">
          <p className="text-base font-medium">
            {type === "INSTALLMENT" ? "Parcelado" : "Fixa"}
          </p>
          {installmentNumber && (
            <p className="text-sm italic text-gray-500">
              {installmentNumber} / {totalInstallments}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="mb-2">
          <p className="font-bold text-sm text-gray-600">Valor</p>
          <p className="text-lg font-semibold">{amount} R$</p>
        </div>
      </div>

      <div className="">
        {paid ? (
          <div className="flex  items-center justify-between">
            <div>
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                Pago <MdCheckCircle size={18} />
              </span>
              <span className="text-sm font-semibold italic">
                {paymentDate}
              </span>
            </div>
            <div className="">
              <button onClick={handleDelete}>
                <MdDelete size={30} className="cursor-pointer text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <button
            className={`w-full px-4 py-2 rounded-md text-white font-bold transition duration-300 ${
              isOverdue
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-700 hover:bg-emerald-600"
            }`}
            onClick={handlePay}
            disabled={isPaying}
          >
            {isPaying ? "Pagando..." : "Pagar"}
          </button>
        )}
      </div>

      {/* Ações */}
    </div>
  );
}
