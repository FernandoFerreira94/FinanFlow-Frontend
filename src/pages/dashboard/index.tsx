import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbPigMoney } from "react-icons/tb";

import { AuthContext } from "../../context/AuthContext";
import CardExpense from "./componentsDashboard/cardExpense";
import { useExpenses } from "../../hook/useExpenses";
import { InputDate } from "./componentsDashboard/inputDate";
import { Content } from "../../componentsGlobal/content";

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

  const { data, isLoading, isError } = useExpenses({
    type: typeExpense,
    id: user?.id || "",
    token: user?.token || "",
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

  return (
    <Content name={user?.name}>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-gray-500 text-4xl  flex items-center gap-3">
          Despesas <TbPigMoney size={40} />
        </h1>
        <div className="custom-select w-70">
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

      {!isLoading && !isError && Array.isArray(data) && data.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl">Você não possui despesas cadastradas.</p>
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
            id={expense.id}
            paymentDate={expense.paymentDate ?? undefined}
          />
        ))}
    </Content>
  );
}
