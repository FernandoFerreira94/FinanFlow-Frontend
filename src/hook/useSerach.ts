// hooks/useSearch.ts
import { useState } from "react";

export function useSearch(initialValue = "") {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function filterData<T extends { name: string }>(data: T[]): T[] {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return {
    searchTerm,
    handleSearchChange,
    filterData,
  };
}
