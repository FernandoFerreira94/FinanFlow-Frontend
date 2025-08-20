import React from "react";
// types do projeto

// types de despesas
export interface ExpenseProps {
  id: string;
  name: string;
  amount: number;
  dueDate: string | null;
  purchaseDate?: string | null;
  paymentDate?: string | null;
  type: string;
  installments?: number;
  installmentNumber?: number;
  totalInstallments?: number;
  paid: boolean;
  userId: string;
  read: boolean;
}
// types de content mobile
export interface ContentMobileProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  url: string;
}

// types de title dashboard
export interface TitleDashboardProps {
  title: string;
  icon: React.ReactNode;
}

// types de input
export interface InputMobileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // apenas a label continua obrigatória
  className?: string; // opcional para receber classes extras
  showToggle?: () => void;
  showPassword?: boolean;
}

// types de footer
export interface FooterLinkProps {
  url?: string;
  link?: string;
  text?: string;
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
  id?: string;
  token?: string;
  month?: number;
  year?: number;
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
  id: string;
  paymentDate?: string;
  pay?: boolean;
}

// types de LinkNav
export interface LinkNavProps {
  icon: React.ReactNode;
  span?: React.ReactNode;
  text: string;
  url: string;
  notification?: number;
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

// types cardNotification
export interface CardNotificationProps {
  name: string;
  purchaseDate: string | null;
  amount: number;
  id: string;
  read: boolean;
}
