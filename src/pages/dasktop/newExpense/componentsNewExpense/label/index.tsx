interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  id?: string;
}

// Componente Label
export function Label({ htmlFor, children, id }: LabelProps) {
  return (
    <label htmlFor={htmlFor} id={id} className="text-xl font-semibold ">
      {children}
    </label>
  );
}
