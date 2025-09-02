import { MdNotifications } from "react-icons/md";
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
      className={` mt-auto w-full h-14 border-t   flex items-center justify-end px-8   text-white ${className}`}
    >
      <Link to={"/notification"} className="relative ">
        <div className=" p-2 bg-gray-600/70 rounded-full mb-8">
          <MdNotifications size={35} color="black" />
          {count !== 0 && (
            <span className="absolute top-[-3px] right-[0px] bg-red-600 rounded-full text-sm w-5 h-5 flex items-center justify-center text-center">
              {count}
            </span>
          )}
        </div>
      </Link>
    </footer>
  );
}
