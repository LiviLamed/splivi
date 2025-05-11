import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Group } from "../../models/Group";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGroup, updateGroup } from "../../redux/groupsSlice";
import { v4 as uuid } from "uuid";
import { LoadingButton } from "@mui/lab";

interface GroupFormProps {
  onClose: () => void;
  groupToEdit?: Group; // If provided, we are editing an existing group
}

export default function GroupForm({ onClose, groupToEdit }: GroupFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      groupName: groupToEdit?.name || "",
    },
  });

  // create state of selected user ids - if there's groupToEdit take default values - filters out currentUser
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(
    groupToEdit?.members.filter((id) => id !== currentUser?.id) || [],
  );

  const handleAddUser = (userId: string) => {
    if (!selectedUserIds.includes(userId)) {
      setSelectedUserIds((prev) => [...prev, userId]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  // Filter users for autocomplete (without current user and already selected users)
  const availableUsers = users.filter(
    (user) => user.id !== currentUser?.id && !selectedUserIds.includes(user.id),
  );

  //take the groupName from register -
  const onSubmit = (data: { groupName: string }) => {
    if (selectedUserIds.length < 1) {
      alert("You must select at least one additional member.");
      return;
    }
    setIsLoading(true);
    const groupId = groupToEdit?.id || uuid();
    const newGroup: Group = {
      id: groupId,
      name: data.groupName.trim().toLocaleLowerCase(),
      members: [currentUser!.id, ...selectedUserIds],
      createdBy: currentUser!.id,
    };

    if (groupToEdit) {
      dispatch(updateGroup(newGroup));
    } else {
      dispatch(addGroup(newGroup));
    }
    reset();
    setSelectedUserIds([]);
    onClose();
    setIsLoading(false);
    navigate(`/groups/${groupId}`);
  };

  return (
    <Box>
      <Controller
        name="groupName"
        control={control}
        rules={{ required: "Group name is required." }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Group Name"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Autocomplete
        options={availableUsers}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => {
          if (value) handleAddUser(value.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add Members"
            variant="outlined"
            margin="normal"
          />
        )}
      />

      <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
        {currentUser && (
          <Chip label={currentUser.name + " (You)"} color="primary" />
        )}

        {selectedUserIds.map((id) => {
          const user = users.find((u) => u.id === id);
          if (!user) return null;
          return (
            <Chip
              key={id}
              label={user.name}
              onDelete={() => handleRemoveUser(id)}
              color={"primary"}
            />
          );
        })}
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
        >
          {groupToEdit ? "Update Group" : "Create Group"}
        </LoadingButton>
      </Box>
    </Box>
  );
}
