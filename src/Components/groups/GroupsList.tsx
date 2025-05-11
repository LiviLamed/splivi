import { useAppSelector, useAppDispatch } from "../../redux/store";
import { currentUserGroups } from "../../redux/selectors";
import { Group } from "../../models/Group";
import { User } from "../../models/User";
import { List, Box, Divider } from "@mui/material";
import { GroupListItem } from "./GroupListItem";
import { useNavigate } from "react-router-dom";
import { removeGroup } from "../../redux/groupsSlice";
import { theme } from "../../mui-theme/mui-theme";

interface GroupListProps {
  onClose: () => void;
  openEditModal: (group: Group | null) => void;
  openDeleteModal: (group: Group) => void;
}

export function GroupsList({
  onClose,
  openEditModal,
  openDeleteModal,
}: GroupListProps) {
  const groups: Group[] = useAppSelector(currentUserGroups);
  const users: User[] = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  const groupsWithDisplayInfo = groups.map((group) => {
    const membersExcludingCurrent = group.members.filter(
      (id) => id !== currentUser?.id,
    );
    const membersToDisplay = membersExcludingCurrent.slice(0, 2);
    const memberNames = users
      .filter((user) => membersToDisplay.includes(user.id))
      .map((user) => user.name);

    const hasMoreMembers = membersExcludingCurrent.length > 2;

    return {
      ...group,
      memberNames,
      hasMoreMembers,
      totalMembers: group.members.length,
    };
  });

  return (
    <List
      sx={{
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      {groupsWithDisplayInfo.map((group, index) => (
        <Box key={group.id}>
          <GroupListItem
            group={group}
            onGroupClick={handleGroupClick}
            onEditGroup={() => openEditModal(group)}
            onDeleteGroup={() => openDeleteModal(group)}
          />
          {index < groupsWithDisplayInfo.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
}
