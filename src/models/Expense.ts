export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  date: string; // ISO string
  paidBy: string;
  participants: string[];
  createdAt?: string;
  splitMode: "equal" | "custom";
  shares: { userId: string; amount: number }[];
}

export interface ExpenseFormData {
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
}
