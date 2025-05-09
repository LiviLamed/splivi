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
  },
});

export const { syncGroupsWithStorage } = groupsSlice.actions;
