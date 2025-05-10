import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../models/Group";

interface GroupsState {
  groups: Group[];
  currentGroup: string;
}

const rawGroups = localStorage.getItem("groups");

const initialState = {
  groups: [],
  currentGroup: null,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    syncGroupsWithStorage(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
      localStorage.setItem("groups", JSON.stringify(state.groups));
    },
    removeGroup(state, action: PayloadAction<string>) {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload,
      );
      localStorage.setItem("groups", JSON.stringify(state.groups));
    },
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
      localStorage.setItem("groups", JSON.stringify(state.groups));
    },
    updateGroup(state, action: PayloadAction<Group>) {
      const updatedGroup = action.payload;
      const index = state.groups.findIndex(
        (group) => group.id === updatedGroup.id,
      );

      if (index !== -1) {
        state.groups[index] = updatedGroup;
        localStorage.setItem("groups", JSON.stringify(state.groups));
      }
    },
  },
});

export const { syncGroupsWithStorage, addGroup, updateGroup, removeGroup } =
  groupsSlice.actions;
