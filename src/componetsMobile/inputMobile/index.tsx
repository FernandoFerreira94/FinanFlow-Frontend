import type { InputMobileProps } from "../../types";

// Componente Input Mobile
export function InputMobile({
  label,
  className = "",
  ...rest
}: InputMobileProps) {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <label className="font-sans">{label}</label>
      <input
        className={`bg-input h-15 rounded-lg px-3 font-sans font-semibold  ${className}`} // merge das classes
        {...rest} // mantém todas as outras props
      />
    </div>
  );
}
