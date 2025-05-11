import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/User";

export interface UsersState {
  users: User[];
  currentUser: User | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("loggedUser");
    },
    register(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.currentUser = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },
    syncUsersWithStorage(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { login, logout, register, syncUsersWithStorage } =
  usersSlice.actions;
