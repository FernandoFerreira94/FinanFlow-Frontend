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

export interface DeleteExpenseProps {
  idExpense: string;
  token: string;
}

export interface GetExpense {
  type: string;
  id: string;
  token: string;
  month: number;
  year: number;
}

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

export interface LinkNavProps {
  icon: React.ReactNode;
  text: string;
  url: string;
}

export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export interface UserProps {
  name: string;
  email: string;
  id: string;
  token: string;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface InputDateProps {
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
}
