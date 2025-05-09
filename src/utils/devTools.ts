import { seedUsers } from "../mock/mockUsers";
import { seedGroups } from "../mock/mockGroups";
import { seedExpenses } from "../mock/mockExpenses";

export function seedAll() {
  seedUsers();
  seedGroups();
  seedExpenses();
  console.log("[Seed] All mock data loaded.");
}

export function resetAll() {
  localStorage.removeItem("users");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("groups");
  localStorage.removeItem("expenses");
  console.log("[Seed] All localStorage data cleared.");
}
