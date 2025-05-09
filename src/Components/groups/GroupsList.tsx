import { Box } from "@mui/material";
import { Group } from "../../models/Group";
import GroupCard from "./GroupCard";

interface Props {
  groups: Group[];
}

export default function GroupList({ groups }: Props) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </Box>
  );
}
