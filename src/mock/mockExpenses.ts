import { Expense } from "../models/Expense";
import { store } from "../redux/store";
import { v4 as uuid } from "uuid";
import { syncExpensesWithStorage } from "../redux/expensesSlice";

export function seedExpenses() {
  const users = store.getState().users.users;
  const groups = store.getState().groups.groups;

  const mockExpenses: Expense[] = [
    {
      id: uuid(),
      groupId: groups[0].id,
      description: "Gas for the trip",
      amount: 120,
      paidBy: users[0].id,
      participants: [users[0].id, users[1].id],
      splitMode: "equal",
      shares: [
        { userId: users[0].id, amount: 60 },
        { userId: users[1].id, amount: 60 },
      ],
      date: new Date().toISOString(),
    },
    {
      id: uuid(),
      groupId: groups[1].id,
      description: "Lunch",
      amount: 80,
      paidBy: users[2].id,
      participants: [users[2].id, users[3].id],
      splitMode: "equal",
      shares: [
        { userId: users[2].id, amount: 40 },
        { userId: users[3].id, amount: 40 },
      ],
      date: new Date().toISOString(),
    },
    {
      id: uuid(),
      groupId: groups[2].id,
      description: "Birthday Cake",
      amount: 150,
      paidBy: users[4].id,
      participants: [users[2].id, users[4].id],
      splitMode: "equal",
      shares: [
        { userId: users[2].id, amount: 75 },
        { userId: users[4].id, amount: 75 },
      ],
      date: new Date().toISOString(),
    },
    {
      id: uuid(),
      groupId: groups[3].id,
      description: "Gift",
      amount: 200,
      paidBy: users[3].id,
      participants: [users[0].id, users[3].id, users[5].id],
      splitMode: "custom",
      shares: [
        { userId: users[0].id, amount: 66.67 },
        { userId: users[3].id, amount: 66.67 },
        { userId: users[5].id, amount: 66.66 },
      ],
      date: new Date().toISOString(),
    },
    {
      id: uuid(),
      groupId: groups[4].id,
      description: "Netflix subscription",
      amount: 40,
      paidBy: users[5].id,
      participants: [users[1].id, users[5].id],
      splitMode: "equal",
      shares: [
        { userId: users[1].id, amount: 20 },
        { userId: users[5].id, amount: 20 },
      ],
      date: new Date().toISOString(),
    },
    {
      id: uuid(),
      groupId: groups[5].id,
      description: "Tent rental",
      amount: 300,
      paidBy: users[2].id,
      participants: [users[2].id, users[3].id, users[5].id],
      splitMode: "equal",
      shares: [
        { userId: users[2].id, amount: 100 },
        { userId: users[3].id, amount: 100 },
        { userId: users[5].id, amount: 100 },
      ],
      date: new Date().toISOString(),
    },
    {
      id: uuid(),
      groupId: groups[6].id,
      description: "Grocery shopping",
      amount: 250,
      paidBy: users[4].id,
      participants: [users[0].id, users[2].id, users[4].id],
      splitMode: "custom",
      shares: [
        { userId: users[0].id, amount: 83.33 },
        { userId: users[2].id, amount: 83.33 },
        { userId: users[4].id, amount: 83.34 },
      ],
      date: new Date().toISOString(),
    },
  ];

  const existingRaw = localStorage.getItem("expenses");
  const existingExpenses: Expense[] = existingRaw
    ? JSON.parse(existingRaw)
    : [];

  const newExpenses = mockExpenses.filter(
    (mock) => !existingExpenses.some((e) => e.id === mock.id),
  );

  const mergedExpenses = [...existingExpenses, ...newExpenses];

  store.dispatch(syncExpensesWithStorage(mergedExpenses));
}
