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
    <Container
      className={`flex-row max-sm:flex-col ml-60 max-sm:ml-0 ${className}`}
    >
      <NavBarLeft />
      <main
        className="w-full flex-1 flex flex-col items-center mx-auto max-w-800 
      max-sm:mt-30 max-sm:m-0 "
      >
        <div
          className={`w-9/10 h-40 flex items-center justify-between px-10 
         max-sm:flex-col max-sm:w-full max-sm:px-5 max-sm:items-center ${
           Serach && "max-sm:h-40"
         }  max-sm:h-0`}
        >
          <h1 className="font-semibold text-4xl flex gap-3 items-center max-sm:flex-col max-sm:w-full">
            {Icon ? (
              <>
                <Icon size={40} className="max-sm:hidden" />
                {title}
              </>
            ) : (
              <>
                {title}
                <span className="text-emerald-700 max-sm:text-2xl max-sm:w-full text-center">
                  {name ? name : "???"}
                </span>
              </>
            )}
          </h1>
          {Serach}
        </div>
        <section
          className="w-full mt-10 py-10 px-10 flex gap-8
        max-sm:px-2 
        "
        >
          <div className="w-full   flex flex-col gap-4 border-green-900/70 shadow-lg  shadow-gray-900/40 bg-white p-10 rounded-xl max-sm:px-4">
            {children}
          </div>
        </section>
      </main>
    </Container>
  );
}
