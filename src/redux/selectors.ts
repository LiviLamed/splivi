import { SpliviState } from "./store";

export const currentUserGroups = (state: SpliviState) => {
  const currentUserId = state.users.currentUser?.id;
  if (!currentUserId) return [];

  return state.groups.groups.filter((group) =>
    group.members.includes(currentUserId),
  );
};

export function optimizeTransaction(balances: Record<string, number>) {
  const transactions: { from: string; to: string; amount: number }[] = [];

  const creditors = Object.entries(balances)
    .filter(([_, balance]) => balance > 0)
    .map(([userId, balance]) => ({ userId, balance }))
    .sort((a, b) => b.balance - a.balance); // Sort descending by balance

  const debtors = Object.entries(balances)
    .filter(([_, balance]) => balance < 0)
    .map(([userId, balance]) => ({ userId, balance }))
    .sort((a, b) => a.balance - b.balance);

  let creditorsIndex = 0;
  let debtorsIndex = 0;

  while (creditorsIndex < creditors.length && debtorsIndex < debtors.length) {
    const creditor = creditors[creditorsIndex];
    const debtor = debtors[debtorsIndex];

    const payment = Math.min(Math.abs(debtor.balance), creditor.balance);

    transactions.push({
      from: debtor.userId,
      to: creditor.userId,
      amount: payment,
    });

    creditor.balance -= payment;
    debtor.balance += payment;

    if (creditor.balance === 0) creditorsIndex++;
    if (debtor.balance === 0) debtorsIndex++;
  }

  return transactions;
}
