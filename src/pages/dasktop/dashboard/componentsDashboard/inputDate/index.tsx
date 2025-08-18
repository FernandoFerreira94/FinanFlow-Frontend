import type { InputDateProps } from "../../../../../types";

// Input para selecionar o mês
export function InputDate({ month, setMonth, year, setYear }: InputDateProps) {
  return (
    <div className="flex flex-col gap-2 ml-auto text-end ">
      <label htmlFor="month" className="text-sm  font-medium text-gray-700">
        Selecione o mês e o ano
      </label>
      <input
        type="month"
        id="month"
        name="month"
        value={`${year}-${String(month).padStart(2, "0")}`}
        className="flex justify-end  border border-gray-300 rounded-lg bg-gray-200/10 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
        onChange={(e) => {
          const [year, month] = e.target.value.split("-").map(Number);
          setMonth(month);
          setYear(year);
        }}
      />
    </div>
  );
}
