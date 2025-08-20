import { BsExclamationTriangle } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import type { CardNotificationProps } from "../../types";

// Componete Card de Notificação
export function CardNotificationMobile({
  id,
  name,
  purchaseDate,
  amount,
  read,
  onClick,
}: CardNotificationProps & { onClick?: (id: string) => void }) {
  return (
    <button
      className={`${
        read ? "border-gray-400" : "border-red-600 bg-red-50/50"
      } border-l-4  rounded-lg shadow-sm p-4 flex flex-col gap-3 hover:shadow-lg transition w-90 max-w-full`}
      onClick={() => onClick?.(id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AiOutlineExclamationCircle
            size={26}
            className="text-red-600 xl:text-2xl"
          />
          <h2 className="font-semibold text-red-700 xl:text-lg">{name}</h2>
        </div>
        <span className="text-sm text-red-600 font-medium">Pendente</span>
      </div>

      <div className="flex justify-between text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-gray-600">Data vencimento</span>
          <span className="text-gray-800">{purchaseDate}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-medium text-gray-600">Valor</span>
          <span className="text-gray-800 font-semibold">R$ {amount}</span>
        </div>
      </div>

      <div className="bg-red-100 text-red-700 text-center text-sm py-2 rounded-lg font-medium flex items-center justify-center gap-2">
        <BsExclamationTriangle size={20} /> Esta conta está vencida
      </div>
    </button>
  );
}
