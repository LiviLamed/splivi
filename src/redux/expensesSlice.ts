import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../models/Expense";

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    syncExpensesWithStorage(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
      }
    },
  },
});

export const {
  syncExpensesWithStorage,
  addExpense,
  deleteExpense,
  updateExpense,
} = expensesSlice.actions;
