import { MdErrorOutline } from "react-icons/md";

import type { CardNotification } from "../../../../types";

export function CardNotification({
  name = "Nome da conta",
  dueDate = "01/01/2025",
  amount = 0,
  read = false,
}: CardNotification) {
  return (
    <div
      className={` ${
        read ? "" : "border-red-600"
      } border rounded-lg  grid grid-cols-4 bg-[#e3e7e2]/20 py-2 px-10   items-center`}
    >
      <div className="flex ">
        <p className="font-bold text-xl flex gap-2 items-center ">
          <MdErrorOutline size={30} className="text-red-600" /> {name}
        </p>
      </div>
      <div className="flex flex-col items-center  ">
        <p className="font-bold text-lg">Data vencimento</p>
        <p className={`text-lg italic  `}>{dueDate}</p>
      </div>
      <div className="flex flex-col items-center ">
        <p className="font-bold text-lg">Valor</p>
        <p className={`text-lg italic font-semibold `}>R$ {amount}</p>
      </div>
      <div className="flex  ">
        <p className="font-bold text-xl text-red-600">
          Esta conta esta vencida
        </p>
      </div>
    </div>
  );
}
