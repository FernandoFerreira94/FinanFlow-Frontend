import { MdErrorOutline } from "react-icons/md";
import type { CardNotificationProps } from "../../../../types";

export function CardNotification({
  name,
  purchaseDate,
  amount,
  read,
}: CardNotificationProps) {
  return (
    <div
      className={`${
        read ? "" : "border-red-600"
      } border rounded-lg grid grid-cols-4 bg-[#e3e7e2]/20 py-2 px-10 items-center
      max-sm:grid-cols-2 max-sm:gap-3 max-sm:p-3`}
    >
      {/* Nome */}
      <div className="flex max-sm:col-span-2 max-sm:order-1">
        <p className="font-bold text-xl flex gap-2 items-center max-sm:text-lg">
          <MdErrorOutline size={30} className="text-red-600" /> {name}
        </p>
      </div>

      {/* Data vencimento */}
      <div className="flex flex-col items-center max-sm:items-start max-sm:order-2">
        <p className="font-bold text-lg max-sm:text-sm">Data vencimento</p>
        <p className="text-lg italic max-sm:text-sm">{purchaseDate}</p>
      </div>

      {/* Valor */}
      <div className="flex flex-col items-center max-sm:items-start max-sm:order-3">
        <p className="font-bold text-lg max-sm:text-sm">Valor</p>
        <p className="text-lg italic font-semibold max-sm:text-sm">
          R$ {amount}
        </p>
      </div>

      {/* Aviso */}
      <div className="flex max-sm:col-span-2 max-sm:order-4">
        <p className="font-bold text-xl text-red-600 max-sm:text-base">
          Esta conta está vencida
        </p>
      </div>
    </div>
  );
}
