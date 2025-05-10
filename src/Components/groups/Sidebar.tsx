import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  ListItemButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Group } from "../../models/Group";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { currentUserGroups } from "../../redux/selectors";
import { User } from "../../models/User";
import { SideBarChip } from "../ui/StyledChips";
import { theme } from "../../mui-theme/mui-theme";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import GroupForm from "./GroupForm";
import { removeGroup } from "../../redux/groupsSlice";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const groups: Group[] = useAppSelector(currentUserGroups);
  const users: User[] = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);

  const handleCloseModal = () => {
    setIsGroupModalOpen(false); // Close the dialog
  };

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
    onClose();
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
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={(theme) => ({
            width: 250,
            p: 2,
            bgcolor: "#492b53",
            color: "#fff",
            height: "100vh",
            overflow: "hidden",
          })}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              onClick={() => {
                setGroupToEdit(null);
                setIsGroupModalOpen(true);
              }}
              sx={{ color: "#fff" }}
            >
              <AddIcon />
            </IconButton>
            <Typography variant="h6">Groups</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

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
                <ListItem
                  disablePadding
                  sx={{
                    border: "1px solid #6a4f7d",
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemButton
                    onClick={() => handleGroupClick(group.id)}
                    sx={{
                      "&:hover": {
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.primary.dark,
                        border: `3px solid ${theme.palette.primary.dark}`,
                        borderRadius: 2,
                      },
                    }}
                  >
                    {/*----*/}
                    <ListItemText
                      primary={
                        <Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={1}
                          >
                            <Typography variant="subtitle1" fontWeight="bold">
                              {group.name}
                            </Typography>
                            <Typography variant="h6">
                              {group.totalMembers}
                            </Typography>
                          </Box>

                          <Box
                            mt={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between" // Members to the right, chips to the left
                            flexWrap="wrap"
                            gap={0.5}
                          >
                            {/* Members text on the right */}

                            {/* Chips aligned to the left */}
                            <Box display="flex" gap={0.5} flexWrap="wrap">
                              {group.memberNames.map((name, i) => (
                                <SideBarChip
                                  key={`${name}-${i}`}
                                  label={name}
                                  size="small"
                                />
                              ))}

                              {group.hasMoreMembers && (
                                <Typography fontWeight="bold" fontSize="1rem">
                                  …
                                </Typography>
                              )}
                            </Box>

                            <Box
                              position="relative"
                              display="flex"
                              alignItems="center"
                            >
                              <Typography
                                variant="caption"
                                fontSize="0.6rem"
                                fontWeight="bold"
                                sx={{
                                  position: "absolute",
                                  top: -24,
                                  left: 0,
                                }}
                              >
                                members
                              </Typography>

                              <IconButton
                                sx={{
                                  color: "#fff",
                                  ml: 1,
                                  p: 0.5,
                                  width: 4,
                                  height: 4,
                                }}
                                onClick={() => {
                                  setGroupToEdit(group);
                                  setIsGroupModalOpen(true);
                                }}
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>

                              <IconButton
                                onClick={() => {
                                  setIsDeleteModalOpen(true);
                                  setGroupToDelete(group);
                                }}
                                sx={{
                                  color: "#fff",
                                  ml: 1,
                                  p: 0.5,
                                  width: 4,
                                  height: 4,
                                }}
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {index < groupsWithDisplayInfo.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog open={isGroupModalOpen} onClose={handleCloseModal}>
        <DialogTitle>
          <GroupForm
            onClose={handleCloseModal}
            groupToEdit={groupToEdit || undefined}
          />
        </DialogTitle>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this group?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (groupToDelete) {
                navigate("/", { replace: true });

                dispatch(removeGroup(groupToDelete.id));
                setIsDeleteModalOpen(false);
              }
            }}
          >
            Delete Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
