import { Expense } from "../models/Expense";

export type DebtsToPayer = Record<string, number>;

export function calculateEqualShares(
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
  const { paidBy, splitMode, shares } = expense;

  const debtsToPayer: DebtsToPayer = {};

  const sharesToUse =
    splitMode === "equal" ? calculateEqualShares(expense) : shares;

  if (!sharesToUse || !sharesToUse.length) return debtsToPayer;

  sharesToUse.forEach((share) => {
    if (share.userId === paidBy) return;
    debtsToPayer[share.userId] = share.amount;
  });

  console.log({ debtsToPayer });

  return debtsToPayer;
}
