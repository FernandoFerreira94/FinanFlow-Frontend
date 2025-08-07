import { MdSearch } from "react-icons/md";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ElementType;
  title?: string;
  name?: string;
}

import { Container } from "../container";
import { NavBarLeft } from "../navBarLeft";

// Componente Content
export function Content({
  children,
  icon: Icon,
  title = "Seja bem vindo",
  name,
}: ContentProps) {
  return (
    <Container className="flex-row">
      <NavBarLeft />
      <main className="w-full flex-1 flex flex-col items-center mx-auto max-w-800">
        <div className="w-9/10 h-40 flex items-center justify-between px-10">
          <h1 className="font-semibold text-4xl flex gap-3 items-center">
            {Icon ? (
              <>
                <Icon size={40} />
                {title}
              </>
            ) : (
              <>
                {title}
                <span className="text-emerald-700">{name ? name : "???"}</span>
              </>
            )}
          </h1>
          {!Icon && (
            <div className="relative w-3/10">
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/80 focus:border-transparent text-black"
              />
              <MdSearch
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 "
              />
            </div>
          )}
        </div>
        <section className="w-full mt-10 py-10 px-10 flex gap-8">
          <div className="w-full border flex flex-col gap-4 border-green-900/70 shadow-lg shadow-gray-900/40 bg-white p-10 rounded-xl">
            {children}
          </div>
        </section>
      </main>
    </Container>
  );
}
