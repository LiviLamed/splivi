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
import { v4 as uuid } from "uuid";
import { UsersSelect } from "./UsersSelect";
import { ExpenseParticipants } from "./ExpenseParticipants";

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
      debts: [],
      date: new Date().toISOString(),
    },
    mode: "onSubmit",
  });

  const selectedParticipants = watch("participants");
  const splitMode = watch("splitMode");
  const amount = watch("amount");
  const debts = watch("debts") || [];

  const handleToggle = (userId: string) => {
    const updated = selectedParticipants.includes(userId)
      ? selectedParticipants.filter((id) => id !== userId)
      : [...selectedParticipants, userId];

    setValue("participants", updated);
    trigger("participants");
  };

  const handleCustomAmountChange = (userId: string, amount: string) => {
    // amount in debts kept as number
    const numericAmount = parseFloat(amount);
    const updatedDebts = debts.filter((debt) => debt.userId !== userId);

    if (!isNaN(numericAmount) && numericAmount > 0) {
      updatedDebts.push({ userId, amount: numericAmount });
    }

    setValue("debts", updatedDebts);
  };
  //

  const totalDebts = debts.reduce((acc, debt) => acc + debt.amount, 0);
  const remaining = Math.round((amount - totalDebts) * 100) / 100;

  const onSubmit = (data: Expense) => {
    let updatedDebts = data.debts;

    if (data.splitMode === "equal") {
      const perPerson =
        // to keep only 2 decimal points
        Math.round((data.amount / data.participants.length) * 100) / 100;
      updatedDebts = data.participants.map((userId) => ({
        userId,
        amount: perPerson,
      }));
    }

    const expenseToSave: Expense = {
      ...data,
      groupId,
      date: expense?.date || new Date().toISOString(),
      debts: updatedDebts,
    };

    if (expense?.id) {
      dispatch(updateExpense(expenseToSave));
    } else {
      expenseToSave.id = uuid();
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

      {/*defaultValue-provides current useId as paidBy*/}
      <UsersSelect
        users={groupMembers}
        control={control}
        error={errors.paidBy}
        currentUserId={currentUserId}
        defaultValue={expense?.paidBy || currentUserId}
      />

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

      <ExpenseParticipants
        control={control}
        error={errors.participants}
        expense={expense}
        groupMembers={groupMembers}
        watch={watch}
        handleToggle={handleToggle}
        handleCustomAmountChange={handleCustomAmountChange}
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
