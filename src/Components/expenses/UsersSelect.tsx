import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";
import { User } from "../../models/User";

interface UsersSelectProps {
  defaultValue?: string;
  users: User[];
  control: Control<any>;
  error: FieldError;
  currentUserId?: string;
}

export function UsersSelect({
  error,
  control,
  defaultValue,
  users,
  currentUserId,
}: UsersSelectProps) {
  return (
    <FormControl sx={{ mb: 2 }} error={!!error}>
      <InputLabel id="paid-by-label">Paid By</InputLabel>
      <Controller
        name="paidBy"
        control={control}
        defaultValue={defaultValue}
        rules={{ required: "Payer is required" }}
        render={({ field }) => (
          <Select {...field} labelId="paid-by-label" label="Paid By" fullWidth>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name + (user.id === currentUserId ? " (You)" : "")}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
