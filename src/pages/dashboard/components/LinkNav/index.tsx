import { Link } from "react-router-dom";

import type { LinkNavProps } from "../../../../types";

// Link para navegar entre as paginas NavBarLeft
export function LinkNav({ icon, text, url }: LinkNavProps) {
  return (
    <Link to={url} className="flex items-center gap-2 text-lg ">
      <li
        className="flex items-center gap-2 w-full px-2 py-3 pl-4 text-gray-300  cursor-pointer menu-link
               hover:bg-emerald-200/20 transition duration-500 hover:text-white"
      >
        {icon} {text}
      </li>
    </Link>
  );
}
