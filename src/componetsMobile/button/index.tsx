import React from "react";

interface ButtonMobileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // opcional para adicionar classes extras
}

export function ButtonMobile({ className = "", ...rest }: ButtonMobileProps) {
  return (
    <button
      className={`w-full h-14 rounded-lg text-lg  ${className}`}
      {...rest} // mantém todas as outras props, tipo onClick, disabled etc.
    />
  );
}
