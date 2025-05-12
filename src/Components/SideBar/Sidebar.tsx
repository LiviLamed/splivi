import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Group } from "../../models/Group";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { currentUserGroups } from "../../redux/selectors";
import { User } from "../../models/User";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import GroupForm from "../groups/GroupForm";
import { removeGroup } from "../../redux/groupsSlice";
import { GroupsList } from "../groups/GroupsList";
import { theme } from "../../mui-theme/mui-theme";

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
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        variant="permanent"
        sx={{
          bgcolor: theme.palette.secondary.main,
          width: open ? 280 : 0,
          flexShrink: 0,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
        }}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.secondary.light,
            width: open ? 280 : 0,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            bgcolor: theme.palette.secondary.light,
            color: "#fff",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              height: "64px",
              padding: theme.spacing(0, 2),
              bgcolor: theme.palette.primary.main,
            }}
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
            <IconButton
              onClick={onClose}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.5rem",
                ml: 2.5,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: theme.palette.primary.light,
              "&::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <GroupsList
              onClose={onClose}
              openEditModal={(group) => {
                setGroupToEdit(group);
                setIsGroupModalOpen(true);
              }}
              openDeleteModal={(group) => {
                setGroupToDelete(group);
                setIsDeleteModalOpen(true);
              }}
            />
          </Box>
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
              console.log({ groups });
              dispatch(removeGroup(groupToDelete.id));
              setIsDeleteModalOpen(false);
              navigate("/", { replace: true });
            }}
          >
            Delete Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
