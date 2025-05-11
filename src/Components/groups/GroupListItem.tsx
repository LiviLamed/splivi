import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Group } from "../../models/Group";
import { theme } from "../../mui-theme/mui-theme";
import { SideBarChip } from "../ui/StyledChips";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";

interface GroupListItemProps {
  group: Group & {
    memberNames: string[];
    hasMoreMembers: boolean;
    totalMembers: number;
  };
  onGroupClick: (groupId: string) => void;
  onEditGroup: (group: Group) => void;
  onDeleteGroup: (group: Group) => void;
}

export function GroupListItem({
  group,
  onGroupClick,
  onEditGroup,
  onDeleteGroup,
}: GroupListItemProps) {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: 3,
        mb: 1,
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
        boxSizing: "border-box",
        border: `3px solid ${grey[800]}`,
        "&:hover": {
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.primary.dark,
          border: `3px solid ${theme.palette.primary.dark}`,
        },
      }}
    >
      <ListItemButton onClick={() => onGroupClick(group.id)}>
        <ListItemText
          primary={
            <Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  color={grey[800]}
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ textTransform: "capitalize" }}
                >
                  {group.name}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={0.2}
                >
                  <Typography variant="h6" color={grey[800]}>
                    {group.totalMembers}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="0.6rem"
                    fontWeight="bold"
                    color={grey[800]}
                  >
                    members
                  </Typography>
                </Box>
              </Box>

              {/* chips and icons  */}
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between" // Added: Separate chips and icons
                flexWrap="wrap"
                gap={0.5}
              >
                {/* Chips Section */}
                <Box display="flex" gap={0.5} flexWrap="wrap">
                  {group.memberNames.map((name, i) => (
                    <SideBarChip
                      key={`${name}-${i}`}
                      label={name}
                      size="small"
                    />
                  ))}
                  {group.hasMoreMembers && (
                    <Typography
                      fontWeight="bold"
                      fontSize="1rem"
                      color={theme.palette.primary.light}
                    >
                      …
                    </Typography>
                  )}
                </Box>

                {/* Icons Section */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={0.5}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                      sx={{
                        color: theme.palette.primary.light,
                        p: 0.5,
                        width: 24,
                        height: 24,
                        transition: "color 0.3s ease, transform 0.2s ease",
                        opacity: 0.6,
                        "&:hover": {
                          opacity: 1,
                          color: theme.palette.primary.dark,
                          transform: "scale(1.2)",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditGroup(group);
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      sx={{
                        color: theme.palette.primary.light,
                        p: 0.5,
                        width: 24,
                        height: 24,
                        transition: "color 0.3s ease, transform 0.2s ease",
                        opacity: 0.6,
                        "&:hover": {
                          opacity: 1,
                          color: theme.palette.primary.dark,
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteGroup(group);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              {/* END NEW */}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
