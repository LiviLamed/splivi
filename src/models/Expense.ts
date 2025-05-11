export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  date: string;
  paidBy: string;
  participants: string[];
  createdAt?: string;
  splitMode: "equal" | "custom";
  debts: Debt[];
}

export interface Debt {
  userId: string;
  amount: number;
}

export interface ExpenseFormData {
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
}
