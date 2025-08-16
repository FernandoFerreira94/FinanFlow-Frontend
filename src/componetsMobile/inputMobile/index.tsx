import React from "react";

interface InputMobileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // apenas a label continua obrigatória
  className?: string; // opcional para receber classes extras
}

export function InputMobile({
  label,
  className = "",
  ...rest
}: InputMobileProps) {
  return (
    <div className="flex flex-col gap-3 mb-5 w-full ">
      <label>{label}</label>
      <input
        className={`bg-input h-15 rounded-lg px-3 ${className}`} // merge das classes
        {...rest} // mantém todas as outras props
      />
    </div>
  );
}
