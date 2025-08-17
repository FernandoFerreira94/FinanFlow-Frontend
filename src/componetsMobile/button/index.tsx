import React from "react";

interface ButtonMobileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean; // novo estado de loading
}

export function ButtonMobile({
  className = "",
  isLoading = false,
  disabled,
  children,
  ...rest
}: ButtonMobileProps) {
  return (
    <button
      className={`w-full  rounded-lg text-lg flex items-center justify-center transition
        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}`}
      disabled={disabled || isLoading} // bloqueia clique no loading
      {...rest}
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
}
