import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbPigMoney } from "react-icons/tb";
import { MdSearch } from "react-icons/md";

import { AuthContext } from "../../../context/AuthContext";
import CardExpense from "./componentsDashboard/cardExpense";
import { useExpenses } from "../../../hook/useExpenses";
import { InputDate } from "./componentsDashboard/inputDate";
import { Content } from "../../../componentsGlobal/content";
import { DashboardMobile } from "../../mobile/dashboard";
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

  const [typeExpense, setTypeExpense] = useState("unpaid");
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
          <div className="relative w-3/10 max-sm:w-full ">
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
        <div className="flex items-center justify-between mb-5 max-sm:flex-col max-sm:gap-4 max-sm:items-start ">
          <h1 className="text-gray-500 text-4xl  flex items-center gap-3">
            Despesas <TbPigMoney size={40} />
          </h1>
          <div className="custom-select w-70 max-sm:w-full">
            <select value={typeExpense} onChange={handleTypeExpenseChange}>
              <option value={"unpaid"}>Não pagas</option>
              <option value={"month"}>Meses</option>
              <option value={"paid"}>Pagas</option>
              <option value={"all"}>Todas as despesas</option>
            </select>
            <div className="select-arrow"></div>
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

        {isLoading && (
          <div className="flex items-center justify-center w-full  h-50">
            <div className="custom-loader  w-full"></div>
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
