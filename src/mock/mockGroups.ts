import { v4 as uuid } from "uuid";
import { User } from "../models/User";
import { Group } from "../models/Group";
import { store } from "../redux/store";
import { syncGroupsWithStorage } from "../redux/groupsSlice";

export const seedGroups = () => {
  const users: User[] = store.getState().users.users;

  const groups: Group[] = [
    {
      id: uuid(),
      name: "Trip to Eilat",
      members: [users[0].id, users[1].id, users[2].id],
      createdBy: users[0].id,
    },
    {
      id: uuid(),
      name: "Office Lunch",
      members: [users[2].id, users[3].id],
      createdBy: users[2].id,
    },
    {
      id: uuid(),
      name: "Birthday Party",
      members: [users[0].id, users[2].id, users[4].id],
      createdBy: users[4].id,
    },
    {
      id: uuid(),
      name: "Wedding Gift",
      members: [users[0].id, users[3].id, users[4].id, users[5].id],
      createdBy: users[3].id,
    },
    {
      id: uuid(),
      name: "Netflix Subscription",
      members: [users[1].id, users[5].id],
      createdBy: users[5].id,
    },
    {
      id: uuid(),
      name: "Hiking Gear",
      members: [users[2].id, users[3].id, users[5].id],
      createdBy: users[2].id,
    },
    {
      id: uuid(),
      name: "Roommates Groceries",
      members: [users[0].id, users[2].id, users[4].id],
      createdBy: users[0].id,
    },
  ];

  const existingRaw = localStorage.getItem("groups");
  const existingGroups: Group[] = existingRaw ? JSON.parse(existingRaw) : [];

  const newGroups = groups.filter(
    (mock) => !existingGroups.some((g) => g.id === mock.id),
  );

  const mergedGroups = [...existingGroups, ...newGroups];

  store.dispatch(syncGroupsWithStorage(mergedGroups));
};
