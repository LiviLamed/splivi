import { store } from "../redux/store";
import { login, syncUsersWithStorage } from "../redux/usersSlice";
import { syncGroupsWithStorage } from "../redux/groupsSlice";
import { syncExpensesWithStorage } from "../redux/expensesSlice";

export function initializeStoreFromLocalStorage() {
  const rawUser = localStorage.getItem("loggedUser");
  const rawUsers = localStorage.getItem("users");
  const rawGroups = localStorage.getItem("groups");
  const rawExpenses = localStorage.getItem("expenses");

  if (rawUser) {
    store.dispatch(login(JSON.parse(rawUser)));
  }

  if (rawUsers) {
    store.dispatch(syncUsersWithStorage(JSON.parse(rawUsers)));
  }

  if (rawGroups) {
    store.dispatch(syncGroupsWithStorage(JSON.parse(rawGroups)));
  }

  if (rawExpenses) {
    store.dispatch(syncExpensesWithStorage(JSON.parse(rawExpenses)));
  }
}
