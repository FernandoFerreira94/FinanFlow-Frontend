import type { InputDateProps } from "../../types";

// Input para selecionar o mês
export function InputDateMobile({
  month,
  setMonth,
  year,
  setYear,
}: InputDateProps) {
  return (
    <div className="flex flex-col gap-2 ml-auto text-end ">
      <input
        type="month"
        id="month"
        name="month"
        value={`${year}-${String(month).padStart(2, "0")}`}
        className="flex justify-end ml-auto w-7/10l border-b-2 border-gray-300  bg-gray-200/10 px-4 py-1 focus:outline-none focus:ring-1 focus:ring-gray-800 "
        onChange={(e) => {
          const [year, month] = e.target.value.split("-").map(Number);
          setMonth(month);
          setYear(year);
        }}
      />
    </div>
  );
}
