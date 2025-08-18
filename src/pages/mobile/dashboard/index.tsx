import { MainMobile } from "../../../componetsMobile/mainMobile";
import { useState, useEffect } from "react";
import { useSearch } from "../../../hook/useSerach";

import { HeaderDashboard } from "../../../componetsMobile/headerDashboard";
import { FooterMenu } from "../../../componetsMobile/footerMenu";
import { TitleDashboard } from "../../../componetsMobile/TitleDashboard";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { InputDateMobile } from "../../../componetsMobile/inputDateMobile";
import { useExpenses } from "../../../hook/useExpenses";
import { formatCurrency } from "../../../utils/format";
import { SearchInput } from "../../../componentsGlobal/SearchInput";
import { CardExpenseMobile } from "../../../componetsMobile/cardExpense";

interface DashboardProps {
  month: number;
  setMonth: (month: number) => void;
  year: number;
  setYear: (year: number) => void;
}

export function DashboardMobile({
  month,
  setMonth,
  year,
  setYear,
}: DashboardProps) {
  const [typeExpense, setTypeExpense] = useState("month");
  const [total, setTotal] = useState(0);

  // hook reutilizado
  const { data: expenses } = useExpenses({
    type: typeExpense,
    month,
    year,
  });

  const { searchTerm, handleSearchChange, filterData } = useSearch();
  const filteredData = filterData(expenses || []);
  console.log(filteredData);

  useEffect(() => {
    if (filteredData) {
      const totalAmount = filteredData.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotal(totalAmount);
    }
  }, [filteredData]);

  function handleTypeExpenseChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setTypeExpense(event.target.value);
  }



  return (
    <MainMobile className="hidden max-sm:flex flex-col min-h-screen">
      <HeaderDashboard />

      <div className="flex-1 w-full px-5 flex flex-col gap-3">
        <section className="w-full flex items-center justify-between py-4 ">
          <TitleDashboard
            title="Despesas"
            icon={<RiMoneyDollarCircleFill size={35} />}
          />
          <div className="relative w-50">
            <select
              value={typeExpense}
              onChange={handleTypeExpenseChange}
              className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800"
            >
              <option value="month">Meses</option>
              <option value="unpaid">Não pagas</option>
              <option value="paid">Pagas</option>
              <option value="all">Todas as despesas</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-4">
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
          {typeExpense === "month" && (
            <InputDateMobile
              month={month}
              setMonth={setMonth}
              year={year}
              setYear={setYear}
            />
          )}

          <div className="flex items-center justify-end gap-2  ">
            <p className=" font-semibold font-sans">Total: </p>
            <span className=" font-semibold text-gray-500">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((expense) => (
            <CardExpenseMobile
              key={expense.id}
              id={expense.id}
              name={expense.name}
              dataVencimento={expense.dueDate || ""}
              type={expense.type}
              amount={expense.amount}
              installmentNumber={expense.installmentNumber}
              totalInstallments={expense.totalInstallments}
              idExpense={expense.id}
              paid={expense.paid}
              paymentDate={expense.paymentDate ?? undefined}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Nenhuma despesa encontrada.
          </p>
        )}
      </div>

      <FooterMenu className="sticky bottom-0 w-full" />
    </MainMobile>
  );
}
