import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupsList from "../Components/groups/GroupsList";
import { useAppSelector } from "../redux/store";
import { useEffect } from "react";

export default function GroupsPage() {
  const navigate = useNavigate();
  const groups = useAppSelector((state) => state.groups.groups);
  const currentUser = useAppSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  const myGroups = groups.filter((group) =>
    group.members?.includes(currentUser?.id),
  );

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          My Groups
        </Typography>
        <Button variant="contained" onClick={() => navigate("/create-group")}>
          Create Group
        </Button>
      </Box>

      <GroupsList groups={myGroups} />
    </Box>
  );
}
