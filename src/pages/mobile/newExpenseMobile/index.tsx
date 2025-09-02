import { MainMobile } from "../../../componetsMobile/mainMobile";
import { HeaderDashboard } from "../../../componetsMobile/headerDashboard";
import { FooterMenu } from "../../../componetsMobile/footerMenu";
import { TitleDashboard } from "../../../componetsMobile/TitleDashboard";
import { MdLibraryAdd } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useCreateExpense } from "../../../hook/useCreateExpense";
import type { CreateExpense, FormDataProps } from "../../../types";
import { ButtonMobile } from "../../../componetsMobile/button";

const today = new Date();
const formattedToday = today.toISOString().split("T")[0];

export function NewExpenseMobile() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { user, isLoadingCreateExpense } = context;

  const [type, setType] = useState<"FIXED" | "INSTALLMENT">("FIXED");
  const [purchaseDate, setPurchaseDate] = useState(formattedToday);
  const [dueDate, setDueDate] = useState("");

  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    amount: "",
    installments: "",
  });

  const resetForm = () => {
    setFormData({ name: "", amount: "", installments: "" });
    setPurchaseDate(formattedToday);
    setDueDate("");
    setType("FIXED");
  };

  const { mutate } = useCreateExpense();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const formattedValue =
      name === "name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user?.id) return;

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

    mutate(data, {
      onSuccess: () => {
        resetForm();
      },
    });
  }

  return (
    <MainMobile className="flex flex-col min-h-screen bg-gray-50">
      <HeaderDashboard />

      <div className="flex-1 px-5 py-4">
        <TitleDashboard
          title="Cadastrar despesa"
          icon={<MdLibraryAdd size={30} />}
        />

        <div className="mt-4 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4 border border-gray-200">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">
                Nome da despesa
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ex: Internet"
                className="p-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none w-full text-base"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Valor</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Ex: 150"
                className="p-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none w-full text-base"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Tipo</label>
              <select
                name="type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "FIXED" | "INSTALLMENT")
                }
                className="p-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none w-full text-base"
              >
                <option value="FIXED">Fixa</option>
                <option value="INSTALLMENT">Parcelada</option>
              </select>
            </div>

            {type === "INSTALLMENT" && (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Parcelas</label>
                <input
                  type="number"
                  name="installments"
                  value={formData.installments}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 12"
                  className="p-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none w-full text-base"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">
                Data da compra
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
                className="p-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none w-full text-base"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">
                Data de vencimento
              </label>
              <input
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="p-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none w-full text-base"
              />
            </div>

            <ButtonMobile
              type="submit"
              disabled={isLoadingCreateExpense}
              isLoading={isLoadingCreateExpense}
              className={`mt-4 h-12 rounded-xl w-full font-semibold text-white transition bg-emerald-800 `}
            >
              Cadastrar
            </ButtonMobile>
          </form>
        </div>
      </div>

      <FooterMenu className="sticky bottom-0 w-full" />
    </MainMobile>
  );
}
