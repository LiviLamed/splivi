import {
  Box,
  IconButton,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { Expense } from "../../models/Expense";
import { User } from "../../models/User";
import { useAppDispatch } from "../../redux/store";
import { addExpense, updateExpense } from "../../redux/expensesSlice";

interface ExpenseFormProps {
  onClose: () => void;
  expense?: Expense;
  isFormLoading?: boolean;
  groupId: string;
  currentUserId: string;
  id?: string;
  groupMembers: User[];
}

export default function ExpenseForm({
  onClose,
  expense,
  isFormLoading = false,
  groupId,
  currentUserId,
  groupMembers,
}: ExpenseFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    control,
  } = useForm<Expense>({
    defaultValues: expense || {
      id: "",
      groupId,
      description: "",
      amount: 0,
      paidBy: currentUserId,
      participants: [currentUserId],
      splitMode: "equal",
      shares: [],
      date: new Date().toISOString(),
    },
    mode: "onSubmit",
  });

  const selectedParticipants = watch("participants");
  const paidBy = watch("paidBy");
  const splitMode = watch("splitMode");
  const amount = watch("amount");
  const shares = watch("shares") || [];

  const handleToggle = (userId: string) => {
    const updated = selectedParticipants.includes(userId)
      ? selectedParticipants.filter((id) => id !== userId)
      : [...selectedParticipants, userId];

    setValue("participants", updated);
    trigger("participants");
  };

  const handleCustomAmountChange = (userId: string, value: string) => {
    const numericValue = parseFloat(value);
    const updatedShares = shares.filter((s) => s.userId !== userId);

    if (!isNaN(numericValue) && numericValue > 0) {
      updatedShares.push({ userId, amount: numericValue });
    }

    setValue("shares", updatedShares);
  };

  const getUserName = (userId: string) => {
    return groupMembers.find((user) => user.id === userId)?.name || "";
  };

  const totalShared = shares.reduce((acc, share) => acc + share.amount, 0);
  const remaining = Math.round((amount - totalShared) * 100) / 100;

  const onSubmit = (data: Expense) => {
    let sharesToSave = data.shares;

    if (data.splitMode === "equal") {
      const perPerson =
        Math.round((data.amount / data.participants.length) * 100) / 100;
      sharesToSave = data.participants.map((userId) => ({
        userId,
        amount: perPerson,
      }));
    }

    const expenseToSave: Expense = {
      ...data,
      groupId,
      date: expense?.date || new Date().toISOString(),
      shares: sharesToSave,
    };

    if (expense?.id) {
      dispatch(updateExpense(expenseToSave));
    } else {
      expenseToSave.id = crypto.randomUUID();
      dispatch(addExpense(expenseToSave));
    }

    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
      noValidate
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <FormControl sx={{ mb: 2 }} error={!!errors.paidBy}>
        <InputLabel id="paid-by-label">Paid By</InputLabel>
        <Controller
          name="paidBy"
          control={control}
          defaultValue={expense?.paidBy || currentUserId}
          rules={{ required: "Payer is required" }}
          render={({ field }) => (
            <Select
              {...field}
              labelId="paid-by-label"
              label="Paid By"
              fullWidth
            >
              {groupMembers.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name + (user.id === currentUserId ? " (You)" : "")}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.paidBy && (
          <FormHelperText>{errors.paidBy.message}</FormHelperText>
        )}
      </FormControl>

      <TextField
        label="Description"
        {...register("description", {
          required: "Describing the expense is a must",
        })}
        error={!!errors.description}
        helperText={errors.description?.message || ""}
      />

      <TextField
        sx={{ my: 2 }}
        fullWidth
        label="Amount"
        type="number"
        required
        {...register("amount", {
          required: "Did you forget how much it was?",
          min: { value: 0.01, message: "Must be greater than 0" },
        })}
        error={!!errors.amount}
        helperText={errors.amount?.message || ""}
      />

      <Controller
        name="splitMode"
        control={control}
        defaultValue={expense?.splitMode || "equal"}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value === "custom"}
                onChange={(e) =>
                  field.onChange(e.target.checked ? "custom" : "equal")
                }
              />
            }
            label="Custom split"
            sx={{ mt: 1 }}
          />
        )}
      />

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

            {errors.participants && (
              <Typography color="error" variant="body2" mt={1}>
                {errors.participants.message}
              </Typography>
            )}

            {splitMode === "custom" && (
              <Box mt={3}>
                <Typography variant="subtitle2" fontWeight={500} mb={1}>
                  Set custom amounts:
                </Typography>

                {selectedParticipants.map((userId) => {
                  const currentAmount =
                    shares.find((s) => s.userId === userId)?.amount || "";
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

      <LoadingButton
        type="submit"
        variant="contained"
        loading={isFormLoading}
        sx={{ mt: 2 }}
        disabled={splitMode === "custom" && remaining !== 0}
      >
        {expense?.id ? "Save Changes" : "Add Expense"}
      </LoadingButton>
    </Box>
  );
}
