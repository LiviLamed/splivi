// components/expenses/ExpensesList.tsx
import { Box, styled } from "@mui/material";
import { Expense } from "../../models/Expense";
import { User } from "../../models/User";
import ExpenseCard from "./ExpenseCard";

interface Props {
  expenses: Expense[];
  currentUserId: string;
  groupMembers: User[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}
const StyledExpensesListContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  justifyContent: "center",
  padding: theme.spacing(4, 0, 5),
}));

export default function ExpensesList({
  expenses,
  currentUserId,
  groupMembers,
  onDelete,
  onEdit,
}: Props) {
  return (
    <StyledExpensesListContainer>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          currentUserId={currentUserId}
          groupMembers={groupMembers}
          onDelete={() => onDelete(expense.id)}
          onEdit={() => onEdit(expense)}
        />
      ))}
    </StyledExpensesListContainer>
  );
}
