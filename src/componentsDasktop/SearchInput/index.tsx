// components/SearchInput.tsx
import { MdSearch } from "react-icons/md";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// componente de input de busca
export function SearchInput({ value, onChange, className }: SearchInputProps) {
  return (
    <div className={`relative ${className || ""}`}>
      <input
        type="search"
        placeholder="Buscar..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-input 
          focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent text-black"
        value={value}
        onChange={onChange}
      />
      <MdSearch
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
}
