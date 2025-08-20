import { useContext, useState } from "react";
import { MdCheckCircle, MdDelete } from "react-icons/md";

import type { CardExpenseProps } from "../../types";

import { AuthContext } from "../../context/AuthContext";
import { usePaidExpense } from "../../hook/usePaidExpense";
import { useDeleteExpense } from "../../hook/useDeleteExpense";
import { parseBRDate } from "../../utils/parseBRDate";

// Componente para exibir as despesas
export function CardExpenseMobile({
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
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;

  const vencimentoDate = parseBRDate(dataVencimento);
  const isOverdue = !paid && vencimentoDate < new Date();

  const { mutate: deleteExpense } = useDeleteExpense();
  const { mutate: paidExpense } = usePaidExpense();
  const [isPaying, setIsPaying] = useState(false);

  // Função para marcar a despesa como paga
  const handlePay = () => {
    if (!idExpense || !user?.token) return;
    setIsPaying(true);
    paidExpense(
      { idExpense, token: user.token },
      { onSettled: () => setIsPaying(false) }
    );
  };

  // Função para deletar a despesa
  const handleDelete = () => {
    if (!idExpense) return;
    deleteExpense(idExpense);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 border border-gray-200 hover:shadow-xl transition">
      {/* Cabeçalho: Nome + Status */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
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

      {/* Informações principais */}
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Data de Vencimento</span>
          <span
            className={`${
              paid ? "text-green-600" : isOverdue ? "text-red-500" : ""
            } italic`}
          >
            {dataVencimento}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span>{type === "INSTALLMENT" ? "Parcelado" : "Fixa"}</span>
          {installmentNumber && (
            <span className="italic text-xs">
              {installmentNumber} / {totalInstallments}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 items-end">
          <span className="font-semibold">Valor</span>
          <span className="text-gray-800 font-bold">{amount} R$</span>
        </div>
      </div>

      {/* Ação */}
      {!paid && (
        <button
          className={`mt-1 w-full py-2 rounded-lg text-white font-semibold transition ${
            isOverdue
              ? "bg-red-500 hover:bg-red-600"
              : "bg-emerald-700 hover:bg-emerald-600"
          }`}
          onClick={handlePay}
          disabled={isPaying}
        >
          {isPaying ? "Pagando..." : "Pagar"}
        </button>
      )}

      {/* Data do pagamento, se existir */}
      {paid && paymentDate && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 italic ">
            Pago em: {paymentDate}
          </p>
          <button onClick={handleDelete}>
            <MdDelete size={30} className="text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
}
