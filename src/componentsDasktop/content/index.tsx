interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ElementType;
  title?: string;
  name?: string;
  Serach?: React.ReactNode;
  className?: string;
}

import { Container } from "../container";
import { NavBarLeft } from "../navBarLeft";

// Componente Content
export function Content({
  children,
  icon: Icon,
  title = "Seja bem vindo",
  name,
  Serach,
  className,
}: ContentProps) {
  return (
    <Container className={`flex-row  ml-60 max-sm:hidden ${className}`}>
      <NavBarLeft />
      <main
        className="w-full flex-1 flex flex-col items-center mx-auto max-w-800 
      "
      >
        <div
          className={`w-9/10 h-40 flex items-center justify-between
         `}
        >
          <h1 className="font-semibold text-4xl flex gap-3 items-center">
            {Icon ? (
              <>
                {title}
                <Icon size={40} />
              </>
            ) : (
              <>
                {title}
                <span className="text-emerald-700 text-center ">
                  {name ? (
                    name
                  ) : (
                    <span className="text-2xl">buscando usuario...</span>
                  )}
                </span>
              </>
            )}
          </h1>
          {Serach}
        </div>
        <section
          className="w-full mb-20 mt-5 px-10 flex gap-8
       
        "
        >
          <div className="w-full flex flex-col gap-4 border-green-900/70 shadow-lg  shadow-gray-900/40 bg-white p-10 rounded-xl ">
            {children}
          </div>
        </section>
      </main>
    </Container>
  );
}
