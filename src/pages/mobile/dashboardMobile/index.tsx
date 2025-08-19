import { MainMobile } from "../../../componetsMobile/mainMobile";
import { useState, useEffect } from "react";
import { useSearch } from "../../../hook/useSerach";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  // hook reutilizado
  const {
    data: expenses,
    isLoading,
    isError,
  } = useExpenses({
    type: typeExpense,
    month,
    year,
  });

  const { searchTerm, handleSearchChange, filterData } = useSearch();
  const filteredData = filterData(expenses || []);

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
        {isLoading && (
          <div className="flex items-center justify-center w-full  h-50 flex-col gap-5">
            <div className="custom-loader  w-full"></div>
            <p>Carregando suas despesas</p>
          </div>
        )}

        {!isLoading && isError && (
          <div className="flex items-center justify-center w-full  h-50">
            <h1 className="text-2xl font-semibold max-sm:text-xl">
              Erro ao carregar as despesas 😓
            </h1>
          </div>
        )}
        {!isLoading && !isError && filteredData.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            {typeExpense === "unpaid" && (
              <p className="text-2xl max-sm:text-xl">
                {searchTerm
                  ? "Nenhuma despesa encontrada para sua busca."
                  : "Você não possui despesas para pagar."}
              </p>
            )}
            {typeExpense === "month" && (
              <p className="text-2xl">
                {searchTerm
                  ? "Nenhuma despesa encontrada para sua busca."
                  : "Você não possui despesas nesse mês."}
              </p>
            )}
            {typeExpense === "paid" && (
              <p className="text-2xl">
                {searchTerm
                  ? "Nenhuma despesa encontrada para sua busca."
                  : "Você não possui despesas pagas."}
              </p>
            )}
            {typeExpense === "all" && (
              <>
                <p className="text-2xl">
                  {searchTerm
                    ? "Nenhuma despesa encontrada para sua busca."
                    : "Você não possui despesas cadastradas."}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => navigate("/expense")}
                    className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
                  >
                    Adicionar Despesa
                  </button>
                )}
              </>
            )}
          </div>
        )}
        {filteredData &&
          filteredData.length > 0 &&
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
          ))}
      </div>

      <FooterMenu className="sticky bottom-0 w-full" />
    </MainMobile>
  );
}
