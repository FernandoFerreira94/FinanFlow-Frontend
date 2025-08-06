import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}


