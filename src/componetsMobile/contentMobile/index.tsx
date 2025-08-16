import { IoIosArrowBack } from "react-icons/io";

export function ContentMobile({
  children,
  title = "Acessar",
  subTitle,
}: {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
}) {
  return (
    <main className="w-full flex flex-col px-5 mt-5 ">
      <div className="flex flex-col gap-8 mb-8">
        <IoIosArrowBack size={40} />
        {title && <h1 className="font-bold text-3xl">{title}</h1>}
        {subTitle && <h2 className="font-semibold text-xl">{subTitle}</h2>}
      </div>
      {children}
    </main>
  );
}
