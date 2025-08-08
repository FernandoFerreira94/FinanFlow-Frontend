import { MdLibraryAdd } from "react-icons/md";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import type { CreateExpense, FormDataProps } from "../../types";

import { AuthContext } from "../../context/AuthContext";
import { Content } from "../../componentsGlobal/content";
import { Label } from "./componentsNewExpense/label";

// pegando a data atual
const today = new Date();
const formattedToday = today.toISOString().split("T")[0]; // yyyy-mm-dd

// Componente NewExpense
export default function NewExpense() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { createExpense, user, refetchNotification } = context;
  const [type, setType] = useState<"FIXED" | "INSTALLMENT">("FIXED"); // <-- Corrigido para MAIÚSCULO
  const [dueDate, setDueDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(formattedToday);

  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    amount: "",
    installments: "",
  });

  // hook para criar despesa
  const mutante = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Despesa criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar despesa. Tente novamente.");
    },
  });

  // funções para manipular os dados do formulário
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const formattedValue =
      name === "name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  }

  // função button para criar a despesa
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      ...formData,
      amount: Number(formData.amount),
      installments:
        type === "INSTALLMENT" ? Number(formData.installments) : null,
      type, // <-- já estará em MAIÚSCULO
      dueDate,
      purchaseDate,
      userId: user?.id,
    } as CreateExpense;

    mutante.mutate(data);
    refetchNotification();
  }

  return (
    <Content icon={MdLibraryAdd} title="Nova despesa">
      <form className="grid grid-cols-4 gap-5" onSubmit={handleSubmit}>
        {/* COLUNA 1 */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="name" id="name">
            Nome da despesa:
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome da despesa"
              className="border border-gray-300 rounded-lg p-2 w-full font-medium text-lg"
            />
          </Label>

          <Label htmlFor="amount" id="amount">
            Valor total:
            <input
              type="number"
              id="amount"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              placeholder="Valor"
              className="border border-gray-300 rounded-lg p-2 w-full font-medium text-lg"
            />
          </Label>
        </div>

        {/* COLUNA 2 */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="type" id="type">
            Tipo:
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as "FIXED" | "INSTALLMENT")
              }
              className="border border-gray-300 rounded-lg py-3 px-2 w-full font-medium text-lg"
            >
              <option value="FIXED">Fixa</option>
              <option value="INSTALLMENT">Parcelada</option>
            </select>
          </Label>

          {type === "INSTALLMENT" && (
            <Label htmlFor="installment" id="installment">
              Quantas parcelas:
              <input
                type="number"
                id="installments"
                name="installments"
                required
                value={formData.installments}
                onChange={handleChange}
                placeholder="Ex: 12"
                className="border border-gray-300 rounded-lg p-2 w-full font-medium text-lg"
              />
            </Label>
          )}
        </div>

        {/* COLUNA 3 */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="purchaseDate" id="purchaseDate">
            Data da compra:
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
              className="border font-medium w-full border-gray-300 rounded-lg bg-gray-200/10 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </Label>

          <Label htmlFor="dueDate" id="dueDate">
            Data de vencimento:
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="border w-full font-medium border-gray-300 rounded-lg bg-gray-200/10 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </Label>
        </div>

        {/* COLUNA 4 - SUBMIT */}
        <div className="flex items-center justify-center col-span-1">
          <input
            type="submit"
            value="Registrar despesa"
            className="bg-emerald-900 duration-500  hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer transition w-full"
          />
        </div>
      </form>
    </Content>
  );
}
