import { Box, Stack, Typography } from "@mui/material";
import { Group } from "../../models/Group";
import { StyledCard } from "../ui/StyledCard";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  BoldUserChip,
  UserChip,
  CurrentUserChip,
  CurrentBoldUserChip,
} from "../ui/StyledChips";

interface Props {
  group: Group;
}

export default function GroupCard({ group }: Props) {
  const allUsers = useAppSelector((state) => state.users.users);
  const navigate = useNavigate();

  const groupCreator = allUsers.find((u) => u.id === group.createdBy);
  const members = group.members
    .map((id) => allUsers.find((u) => u.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <StyledCard
      onClick={() => navigate(`/groups/${group.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6" fontWeight={700}>
          {group.name}
        </Typography>

        {groupCreator && (
          <Typography
            variant="body2"
            sx={{ color: "gray", textTransform: "capitalize" }}
          >
            Group Creator: {groupCreator.name}
          </Typography>
        )}
      </Box>

      {/* members */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        {members.map((name) => (
          <UserChip key={name} label={name} />
        ))}
      </Stack>
    </StyledCard>
  );
}
