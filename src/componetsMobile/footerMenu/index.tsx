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
      className={`mt-auto w-full h-14 border-t flex items-center justify-around bg-primary-green-6 text-white ${className}`}
    >
      <Link to={"/dashboard"}>
        <MdSpaceDashboard size={35} />
      </Link>

      <Link to={"/expense"}>
        <MdLibraryAdd size={35} />
      </Link>
      <Link to={"/notification"} className="relative">
        <MdNotifications size={35} />
        {count !== 0 && (
          <span className="absolute top-[-6px] right-[-4px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-center">
            {count}
          </span>
        )}
      </Link>
      <Link to={"/user"}>
        <MdAccountCircle size={35} />
      </Link>
    </footer>
  );
}
