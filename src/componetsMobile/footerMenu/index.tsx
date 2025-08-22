import {
  MdSpaceDashboard,
  MdLibraryAdd,
  MdNotifications,
  MdAccountCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";

import { useExpenses } from "../../hook/useExpenses";

// Componente FooterMenu Mobile
export function FooterMenu({ className }: { className?: string }) {
  const { data } = useExpenses({
    type: "notification",
  });

  // Contagem de notificações
  const filterRead = data?.filter((notification) => !notification.read);
  const count = filterRead?.length;

  return (
    <footer
      className={`mt-auto w-full h-10    rounded-t-lg shadow-[0px_0px_10px_#4a5565] flex items-center justify-between px-8 bg-emerald-900/80  text-white ${className}`}
    >
      <div className=" px-4 py-1 rounded-xl bg-white shadow-[0px_0px_6px_#4a5565]">
        <Link to={"/dashboard"}>
          <MdSpaceDashboard size={25} color="#18382d" />
        </Link>
      </div>
      <div className=" px-4 py-1 rounded-xl bg-white shadow-[0px_0px_5px_#4a5565]">
        <Link to={"/expense"}>
          <MdLibraryAdd size={25} color="#18382d" />
        </Link>
      </div>
      <div className=" px-4 py-1 rounded-xl bg-white shadow-[0px_0px_5px_#4a5565]">
        <Link to={"/notification"} className="relative">
          <MdNotifications size={25} color="#18382d" />
          {count !== 0 && (
            <span className="absolute top-[-6px] right-[-4px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-center">
              {count}
            </span>
          )}
        </Link>
      </div>
      <div className=" px-4 py-1 rounded-xl bg-white shadow-[0px_0px_5px_#4a5565]">
        <Link to={"/user"}>
          <MdAccountCircle size={25} color="#18382d" />
        </Link>
      </div>
    </footer>
  );
}
