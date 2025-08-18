import type { ReactNode } from "react";

export function MainMobile({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"main"> & { children?: ReactNode }) {
  return (
    <main
      className={`hidden max-sm:flex flex-col w-full min-h-screen h-full ${className}`}
      {...props}
    >
      {children}
    </main>
  );
}
