// types do projeto

// types de despesas
export interface ExpenseProps {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  purchaseDate?: string | null;
  paymentDate?: string | null;
  type: string;
  installments?: number;
  installmentNumber?: number;
  totalInstallments?: number;
  paid: boolean;
  userId: string;
}

// types de despesas para criar
export interface CreateExpense {
  name: string;
  amount: number;
  dueDate: string;
  type: string;
  installment?: number;
  purchaseDate?: string;
  userId: string;
}

// types de despesas para deletar
export interface DeleteExpenseProps {
  idExpense: string;
  token: string;
}

// types de despesas para pagar
export interface GetExpense {
  type: string;
  id: string;
  token: string;
  month: number;
  year: number;
}

// types de despesas para editar
export interface CardExpenseProps {
  name: string;
  dataVencimento: string;
  type?: string;
  amount?: number;
  installmentNumber?: number;
  totalInstallments?: number;
  idExpense?: string;
  paid: boolean;
}

// types de LinkNav
export interface LinkNavProps {
  icon: React.ReactNode;
  text: string;
  url: string;
}

// types de cadastro
export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

// types do usuario
export interface UserProps {
  name: string;
  email: string;
  id: string;
  token: string;
}

// types de login
export interface LoginUserProps {
  email: string;
  password: string;
}

// types de inputDate
export interface InputDateProps {
  month: number;
  setMonth: (month: number) => void;
  year: number;
  setYear: (year: number) => void;
}

// types de alterar senha
export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

// types de formulario
export interface FormDataProps {
  name: string;
  amount: string;
  installments: string;
}
