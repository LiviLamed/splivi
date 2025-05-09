import { Box, styled } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { syncUsersWithStorage } from "../../redux/usersSlice";
import { syncGroupsWithStorage } from "../../redux/groupsSlice";
import { syncExpensesWithStorage } from "../../redux/expensesSlice";

const StyledMainLayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh", // added to allow proper height for scrollable content
});

export default function MainLayout() {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const groups = JSON.parse(localStorage.getItem("groups") || "[]");
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    dispatch(syncUsersWithStorage(users));
    dispatch(syncGroupsWithStorage(groups));
    dispatch(syncExpensesWithStorage(expenses));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      const rawUser = localStorage.getItem("loggedUser");

      if (rawUser) {
        const parsedUser = JSON.parse(rawUser);
        dispatch(syncUsersWithStorage([...parsedUser])); // אם צריך
        // dispatch(login(parsedUser)); ← עדיף מפורש
      } else {
        navigate("/login");
      }
    }
  }, [currentUser]);

  return (
    <StyledMainLayoutContainer>
      <Header />

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </StyledMainLayoutContainer>
  );
}
