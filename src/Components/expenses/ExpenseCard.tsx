import { Box, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Expense } from "../../models/Expense";
import { User } from "../../models/User";
import { StyledCard } from "../ui/StyledCard";
import { ExpenseCardActionButtons } from "./ExpenseCardActionButtons";
import {
  BoldUserChip,
  UserChip,
  CurrentUserChip,
  CurrentBoldUserChip,
} from "../ui/StyledChips";
import { calculateDebtsToPayer } from "../../utils/calculateDebts";

interface Props {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
  currentUserId: string;
  groupMembers: User[];
}

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
  currentUserId,
  groupMembers,
}: Props) {
  const payer = groupMembers.find((user) => user.id === expense.paidBy);

  const participants: User[] = expense.participants
    .map((id) => groupMembers.find((member) => member.id === id))
    .filter((member): member is User => member !== undefined);

  const debtsToPayer = calculateDebtsToPayer(expense);

  const payerDebt = expense.debts?.find(
    (s) => s.userId === expense.paidBy,
  )?.amount;

  return (
    <StyledCard>
      {/* Description and Date */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{ my: 4 }}
        gap={1}
      >
        <Typography variant="h6">{expense.description}</Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">
            {new Date(expense.date).toLocaleDateString()}
          </Typography>
        </Box>

        <Typography variant="body2">Paid by:</Typography>
        {payer &&
          (currentUserId === payer.id ? (
            <CurrentBoldUserChip
              label={`${payer.name} : ₪${
                payerDebt !== undefined ? parseFloat(payerDebt.toFixed(2)) : "0"
              }`}
            />
          ) : (
            <BoldUserChip
              label={`${payer.name} : ₪${
                payerDebt !== undefined ? parseFloat(payerDebt.toFixed(2)) : "0"
              }`}
            />
          ))}
      </Box>
      <ExpenseCardActionButtons onDelete={onDelete} onEdit={onEdit} />

      {/* Participants and Amount */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%", ml: 2 }}
        gap={2}
      >
        <Stack direction="column" spacing={1} alignItems="center">
          {participants
            .filter((p) => p.id !== expense.paidBy)
            .map((participant) => {
              const debt = debtsToPayer[participant.id];
              const displayAmount =
                debt !== undefined ? parseFloat(debt.toFixed(2)) : "0";

              const ChipComponent =
                participant.id === currentUserId ? CurrentUserChip : UserChip;

              return (
                <ChipComponent
                  key={participant.id}
                  label={`${participant.name} ₪${displayAmount}`}
                />
              );
            })}
        </Stack>

        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#333" }}>
            ₪{expense.amount}
          </Typography>{" "}
        </Box>
      </Box>
    </StyledCard>
  );
}
