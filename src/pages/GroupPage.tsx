import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Box, Typography, Button, Stack, Dialog } from "@mui/material";
import { User } from "../models/User";
import { useEffect, useState } from "react";
import ExpenseForm from "../Components/expenses/ExpenseForm";
import ExpensesList from "../Components/expenses/ExpensesList";
import { Expense } from "../models/Expense";
import { deleteExpense } from "../redux/expensesSlice";
import {
  BoldUserChip,
  CurrentBoldUserChip,
} from "../Components/ui/StyledChips";
import { logout } from "../redux/usersSlice";
import { theme } from "../mui-theme/mui-theme";

export default function GroupPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState<Expense | undefined>();

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const groups = useAppSelector((state) => state.groups.groups);
  const users = useAppSelector((state) => state.users.users);
  const allExpenses = useAppSelector((state) => state.expenses.expenses);
  const dispatch = useAppDispatch();
  const currentGroup = groups.find((group) => group.id === groupId);

  if (!currentGroup) {
    return <Navigate to="/page-not-found" />;
  }

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  if (!currentUser) {
    dispatch(logout());
    return <Navigate to="/auth/login" replace />;
  }

  if (!groupId) {
    return <Navigate to="/page-not-found" />;
  }

  const group = groups.find((group) => group.id === groupId);

  if (!group) {
    return <Navigate to="/page-not-found" />;
  }
  const groupExpenses = allExpenses.filter(
    (expense) => expense.groupId === group.id,
  );

  const groupMembers: User[] = group.members
    .map((id) => users.find((user) => user.id === id))
    .filter((user): user is User => user !== undefined);

  const currentUserTotalPaid = groupExpenses
    .filter((expense) => expense.paidBy === currentUser.id)
    .reduce((acc, expense) => acc + expense.amount, 0);

  const currentUserTotalDebts = groupExpenses
    .flatMap((expense) => expense.debts)
    .filter((debt) => debt.userId === currentUser.id)
    .reduce((acc, debt) => acc + debt.amount, 0);

  const currentUserBalance = currentUserTotalPaid - currentUserTotalDebts;

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={0}
        paddingLeft={20}
        paddingRight={20}
        paddingTop={5}
        paddingBottom={0}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={0}
          paddingLeft={20}
          paddingRight={20}
          paddingTop={5}
          paddingBottom={0}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#6c2bc6",
              color: "#6c2bc6",
              fontWeight: 600,
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: "#4b007d",
                color: "#4b007d",
                backgroundColor: "transparent",
              },
            }}
          >
            ← Home
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap={4}>
          <Typography variant="h5" fontWeight="bold">
            {group.name}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="h6"
              fontWeight="normal"
              sx={{ color: theme.palette.text.primary }}
            >
              Balance:
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color:
                  currentUserBalance >= 0
                    ? theme.palette.primary.main
                    : "#E53935", // Negative balance color
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {currentUserBalance.toFixed(2)}
              <Typography variant="h5" fontWeight="bold" component="span">
                ₪
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Button
            sx={{
              borderColor: "#6c2bc6",
              color: "#6c2bc6",
              fontWeight: 600,
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: "#4b007d",
                color: "#4b007d",
                backgroundColor: "transparent",
              },
            }}
            variant="contained"
            onClick={() => {
              setEditedExpense(undefined);
              setIsDialogOpen(true);
            }}
          >
            Add Expense
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          borderBottom: "1px solid black",
          pb: 2,
          mb: 2,
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ ml: 8, mb: 0 }}>
          Group Members:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {groupMembers.map((member) => {
            const ChipComponent =
              member.id === currentUser.id ? CurrentBoldUserChip : BoldUserChip;
            return <ChipComponent key={member.id} label={member.name} />;
          })}
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <ExpensesList
          expenses={groupExpenses}
          currentUserId={currentUser.id}
          groupMembers={groupMembers}
          onDelete={(id) => handleDelete(id)}
          onEdit={(expense) => {
            setEditedExpense(expense);
            setIsDialogOpen(true);
          }}
        />
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box p={3}>
          <ExpenseForm
            groupId={group.id}
            currentUserId={currentUser.id}
            groupMembers={groupMembers}
            onClose={() => setIsDialogOpen(false)}
            expense={editedExpense}
          />
        </Box>
      </Dialog>
    </Box>
  );
}
