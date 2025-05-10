import { SpliviState } from "./store";

export const currentUserGroups = (state: SpliviState) => {
  const currentUserId = state.users.currentUser?.id;
  if (!currentUserId) return [];

  return state.groups.groups.filter((group) =>
    group.members.includes(currentUserId),
  );
};
