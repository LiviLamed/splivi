import { useParams, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  const group = groups.find((group) => group.id === groupId);

  if (!group || !groupId || !currentUser) {
    return <Typography>Group not found.</Typography>;
  }

  const groupExpenses = allExpenses.filter(
    (expense) => expense.groupId === group.id,
  );

  const groupMembers: User[] = group.members
    .map((id) => users.find((user) => user.id === id))
    .filter((user): user is User => user !== undefined);

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
        <Button
          variant="outlined"
          onClick={() => navigate("/groups")}
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
          ← Back to My Groups
        </Button>

        <Typography variant="h5" fontWeight="bold">
          {group.name}
        </Typography>

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
