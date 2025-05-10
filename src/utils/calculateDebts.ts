import { Expense } from "../models/Expense";

export type DebtsToPayer = Record<string, number>;

export function calculateEqualDebts(
  expense: Expense,
): { userId: string; amount: number }[] {
  const { amount, participants } = expense;

  if (!participants || !participants.length) return [];

  const perPerson = Math.round((amount / participants.length) * 100) / 100;

  return participants.map((userId) => ({
    userId,
    amount: perPerson,
  }));
}

export function calculateDebtsToPayer(expense: Expense): DebtsToPayer {
  const { paidBy, splitMode, debts } = expense;

  const debtsToPayer: DebtsToPayer = {};

  const debtsToUse =
    splitMode === "equal" ? calculateEqualDebts(expense) : debts;

  if (!debtsToUse || !debtsToUse.length) return debtsToPayer;

  debtsToUse.forEach((debt) => {
    if (debt.userId === paidBy) return;
    debtsToPayer[debt.userId] = debt.amount;
  });

  console.log({ debtsToPayer });

  return debtsToPayer;
}
