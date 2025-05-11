import { User } from "../models/User";
import { store } from "../redux/store";
import { syncUsersWithStorage } from "../redux/usersSlice";

export const mockUsers: User[] = [
  {
    id: "8ef949ee-7dc1-4e2e-8e09-a56efae0da18",
    name: "Dana",
    email: "example@gmail.com",
    password: "1234",
  },
  {
    id: "4f05d81d-af0f-409e-859b-d894981c98b6",
    name: "Rami",
    email: "rami@gmail.com",
    password: "rami123",
  },
  {
    id: "697c5254-27b1-4db4-89ea-6bba4034793f",
    name: "Noa",
    email: "noa@gmail.com",
    password: "noa123",
  },
  {
    id: "2a0a2350-40aa-4b09-82e2-be309f437abd",
    name: "Avi",
    email: "avi@gmail.com",
    password: "avi123",
  },
  {
    id: "06913da8-a3e0-42bf-b91c-dbca6bddeca6",
    name: "Tal",
    email: "tal@gmail.com",
    password: "tal123",
  },
  {
    id: "66f29823-03d8-4913-a51a-045d8943f5cf",
    name: "Maya",
    email: "maya@gmail.com",
    password: "maya123",
  },
];

export function seedUsers() {
  const existingRaw = localStorage.getItem("users");
  const existingUsers: User[] = existingRaw ? JSON.parse(existingRaw) : [];

  const newUsers = mockUsers.filter(
    (mock) => !existingUsers.some((u) => u.id === mock.id),
  );

  const mergedUsers = [...existingUsers, ...newUsers];

  store.dispatch(syncUsersWithStorage(mergedUsers));
}
