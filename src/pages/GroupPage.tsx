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
import { grey, purple } from "@mui/material/colors";

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
        alignItems="center"
        justifyContent="space-between"
        paddingLeft={4}
        paddingRight={4}
        paddingTop={3}
        paddingBottom={2}
        sx={{ bgcolor: grey[300], height: 36 }}
        height={42}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h4"
            fontWeight="bold"
            ml={4}
            sx={{
              textTransform: "capitalize",
              color: theme.palette.primary.main,
            }}
          >
            {group.name}
          </Typography>
        </Box>

        {/*  balance */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ marginRight: "80px" }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              border: "2px solid ",
              borderColor: theme.palette.primary.main,
              borderRadius: 3,
              width: "4px 8px",
              minWidth: "300px",
              textAlign: "center",
              justifyContent: "flex-end",
              bgcolor: grey[200],
              color:
                currentUserBalance >= 0
                  ? theme.palette.primary.dark
                  : "#800020",
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

      {/*Group members  + add expense */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft={8}
        paddingRight={24}
        paddingTop={2}
        paddingBottom={3}
        minHeight={42}
        sx={{
          borderBottom: "3px solid ",
          borderColor: grey[600],
          bgcolor: grey[300],
          height: 36,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6">Group Members:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {groupMembers.map((member) => {
              const ChipComponent =
                member.id === currentUser.id
                  ? CurrentBoldUserChip
                  : BoldUserChip;
              return <ChipComponent key={member.id} label={member.name} />;
            })}
          </Stack>
        </Box>

        <Box>
          <Button
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              border: " 3px solid",
              fontWeight: 600,
              backgroundColor: grey[300],
              "&:hover": {
                borderColor: theme.palette.primary.light,
                color: theme.palette.primary.light,
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
