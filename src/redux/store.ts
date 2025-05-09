import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usersSlice } from "./usersSlice";
import { expensesSlice } from "./expensesSlice";
import { groupsSlice } from "./groupsSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    expenses: expensesSlice.reducer,
    groups: groupsSlice.reducer,
  },
});

// Hooks with types
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
