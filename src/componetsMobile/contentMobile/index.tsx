import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

import type { ContentMobileProps } from "../../types";

// Content Mobile
export function ContentMobile({
  children,
  title = "Acessar",
  subTitle,
  url,
}: ContentMobileProps) {
  return (
    <main className="w-full flex flex-col px-5 mt-5 ">
      <div className="flex flex-col gap-6 mb-4">
        <Link className="cursor-pointer" to={url}>
          <IoIosArrowBack size={40} />
        </Link>
        {title && <h1 className="font-bold text-3xl">{title}</h1>}
        {subTitle && (
          <h2 className="font-sans font-semibold text-lg w-8/10 my-1">
            {subTitle}
          </h2>
        )}
      </div>
      {children}
    </main>
  );
}
