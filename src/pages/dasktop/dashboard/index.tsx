import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import { MdSearch } from "react-icons/md";

import { AuthContext } from "../../../context/AuthContext";
import CardExpense from "./componentsDashboard/cardExpense";
import { useExpenses } from "../../../hook/useExpenses";
import { InputDate } from "./componentsDashboard/inputDate";
import { Content } from "../../../componentsDasktop/content";
import { DashboardMobile } from "../../mobile/dashboardMobile";
import { formatCurrency } from "../../../utils/format";

const date = new Date();
// pegando o mês atual
const currentMonth = date.getMonth() + 1;

// componente para exibir o dashboard
export default function Dashbord() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;
  const navigate = useNavigate();

  const [typeExpense, setTypeExpense] = useState("month");
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(2025);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useExpenses({
    type: typeExpense,
    month: month,
    year: year,
  });

  //
  useEffect(() => {
    if (data) {
      const totalAmount = data.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotal(totalAmount);
    }
  }, [data]);

  function handleTypeExpenseChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setTypeExpense(event.target.value);
  }

  const filteredData = Array.isArray(data)
    ? data.filter((expense) =>
        expense.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Content
        className="max-sm:hidden"
        name={user?.name}
        Serach={
          <div className="relative w-3/10 ">
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 bg-white
             focus:outline-none focus:ring-2 focus:ring-emerald-700/80 focus:border-transparent text-black
             max-sm:
             "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MdSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 "
            />
          </div>
        }
      >
        <div className="flex items-center justify-between  mb-3">
          <h1 className="text-gray-500 text-4xl  flex items-center gap-3">
            Despesas <RiMoneyDollarCircleFill size={40} />
          </h1>
          <div className="relative w-90">
            <select
              value={typeExpense}
              onChange={handleTypeExpenseChange}
              className="w-full appearance-none bg-white border border-gray-300 text-gray-500 text-lg font-medium px-4 py-3 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition cursor-pointer"
            >
              <option value="month">Meses</option>
              <option value="unpaid">Não pagas</option>
              <option value="paid">Pagas</option>
              <option value="all">Todas as despesas</option>
            </select>

            {/* Ícone seta customizado */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {typeExpense === "month" && (
          <InputDate
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        )}
        <div className=" flex items-center justify-end gap-2">
          <strong className="text-xl  ">Total: </strong>{" "}
          <span className="text-xl font-semibold text-gray-500">
            {formatCurrency(total)}
          </span>
        </div>

        <div className="flex flex-wrap gap-5 my-5">
          {isLoading && (
            <div className="flex flex-col gap-8 items-center justify-center w-full  h-50">
              <div className="custom-loader  w-full"></div>
              <p className="text-xl font-semibold text-gray-500">
                Carregando despesas...
              </p>
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

          {!isLoading &&
            !isError &&
            filteredData.length > 0 &&
            filteredData.map((expense) => (
              <CardExpense
                key={expense.id}
                name={expense.name}
                dataVencimento={expense.dueDate || ""}
                type={expense.type}
                amount={expense.amount}
                installmentNumber={expense.installmentNumber}
                totalInstallments={expense.totalInstallments}
                idExpense={expense.id}
                paid={expense.paid}
                id={expense.id}
                paymentDate={expense.paymentDate ?? undefined}
              />
            ))}
        </div>
      </Content>
      <DashboardMobile
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />
    </>
  );
}
