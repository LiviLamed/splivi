import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  Merge,
  UseFormWatch,
} from "react-hook-form";
import { Debt, Expense } from "../../models/Expense";
import { User } from "../../models/User";

interface Props {
  control: Control<any>;
  error: Merge<FieldError, FieldError[]>;
  currentUserId?: string;
  expense: Expense;
  groupMembers: User[];
  handleToggle: (userId: string) => void;
  handleCustomAmountChange: (userId: string, amount: string) => void;
  watch: UseFormWatch<Expense>;
}

export function ExpenseParticipants({
  control,
  error,
  currentUserId,
  expense,
  groupMembers,
  handleToggle,
  handleCustomAmountChange,
  watch,
}: Props) {
  const getUserName = (userId: string) => {
    return groupMembers.find((user) => user.id === userId)?.name || "";
  };

  const amount = watch("amount");
  const selectedParticipants = watch("participants");
  const paidBy = watch("paidBy");
  const debts = watch("debts") || [];
  const splitMode = watch("splitMode");

  const totalDebts = debts.reduce((acc, debt) => acc + debt.amount, 0);
  const remaining = Math.round((amount - totalDebts) * 100) / 100; // 2 decimals

  return (
    <Controller
      name="participants"
      control={control}
      defaultValue={expense?.participants || [currentUserId]}
      rules={{
        validate: (value) => {
          if (!value.length) {
            return "Yeah, but who needs to pay?";
          }

          if (value.length === 1 && value[0] === paidBy) {
            return "The payer owes money only to themself? Hmmm...";
          }

          return true;
        },
      }}
      render={({ field }) => (
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Split Between:
          </Typography>

          <Box display="flex" flexWrap="wrap">
            {groupMembers.map((user) => {
              const isSelected = field.value?.includes(user.id);

              return (
                <FormControlLabel
                  key={user.id}
                  control={
                    <Switch
                      checked={isSelected}
                      onChange={() => handleToggle(user.id)}
                      color="primary"
                    />
                  }
                  label={
                    user.name + (user.id === currentUserId ? " (You)" : "")
                  }
                  sx={{ mr: 2 }}
                />
              );
            })}
          </Box>

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error.message}
            </Typography>
          )}

          {splitMode === "custom" && (
            <Box mt={3}>
              <Typography variant="subtitle2" fontWeight={500} mb={1}>
                Set custom amounts:
              </Typography>

              {selectedParticipants.map((userId) => {
                const currentAmount =
                  debts.find((debt) => debt.userId === userId)?.amount || "";
                const isInvalid = currentAmount <= 0;
                return (
                  <TextField
                    key={userId}
                    label={`${getUserName(userId)}`}
                    type="number"
                    sx={{ mb: 1, mr: 2, width: 160 }}
                    defaultValue={currentAmount}
                    onChange={(e) =>
                      handleCustomAmountChange(userId, e.target.value)
                    }
                    inputProps={{ min: 0.01, step: "0.01" }}
                    error={isInvalid}
                    helperText={isInvalid ? "Must be greater than 0" : ""}
                  />
                );
              })}

              <Typography
                variant="body2"
                color={remaining === 0 ? "green" : "error"}
                mt={1}
              >
                Remaining: ₪{remaining.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    />
  );
}
