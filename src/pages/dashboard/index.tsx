import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import CardExpense from "./components/cardExpense";
import { useExpenses } from "../../hook/useExpenses";
import { Container } from "../../components/container";
import { NavBarLeft } from "../../components/navBarLeft";
import { InputDate } from "./components/inputDate";

const date = new Date();
const currentMonth = date.getMonth() + 1; // getMonth() returns

export default function Dashbord() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [typeExpense, setTypeExpense] = useState("month");
  const [month, setMonth] = useState(currentMonth); // Example month
  const [year, setYear] = useState(2025); // Example year
  const [total, setTotal] = useState(0);

  if (!context) throw new Error("AuthContext not found");
  const { user } = context;

  const { data, isLoading, isError } = useExpenses({
    type: typeExpense,
    id: user?.id || "",
    token: user?.token || "",
    month: month, // Example month
    year: year, // Example year
  });

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

  return (
    <Container className="flex-row ">
      <NavBarLeft />
      <main className="w-full flex-1 flex flex-col  items-center mx-auto max-w-800">
        <div className="w-9/10 h-40  flex items-center justify-between px-10">
          <h1 className="font-semibold text-4xl">
            Seja bem vindo{" "}
            <span className="text-emerald-700">
              {user?.name ? user?.name : "???"}
            </span>
          </h1>
          <div className="relative w-3/10">
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/80 focus:border-transparent text-black"
            />
            <MdSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 "
            />
          </div>
        </div>

        <section className="w-full   mt-10 py-10 px-10 flex gap-8">
          <div className="w-10/10 border border-green-900/70 shadow-lg shadow-gray-900/40 bg-white p-10 rounded-xl flex flex-col gap-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-gray-500 text-4xl  flex items-center gap-3">
                Despesas <TbPigMoney size={40} />
              </h1>
              <div className="custom-select w-70">
                <select value={typeExpense} onChange={handleTypeExpenseChange}>
                  <option value={"all"}>Todas as despesas</option>
                  <option value={"paid"}>Todas pagas</option>
                  <option value={"unpaid"}>Todas não pagas</option>
                  <option value={"month"}>Meses</option>
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
                R$ {total.toFixed(2)}
              </span>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center w-full  h-50">
                <div className="custom-loader  w-full"></div>
              </div>
            )}

            {!isLoading && isError && (
              <div className="flex items-center justify-center w-full  h-50">
                <h1 className="text-2xl font-semibold ">
                  Erro ao carregar as despesas 😓
                </h1>
              </div>
            )}

            {!isLoading &&
              !isError &&
              Array.isArray(data) &&
              data.length === 0 && (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-2xl">
                    Você não possui despesas cadastradas.
                  </p>
                  <button
                    onClick={() => navigate("/expense")}
                    className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
                  >
                    Adicionar Despesa
                  </button>
                </div>
              )}
            {!isLoading &&
              !isError &&
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((expense) => (
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
                />
              ))}
          </div>
        </section>
      </main>
    </Container>
  );
}
