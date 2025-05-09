import { Box, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ExpenseCardActionButtons({
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return (
    <Box
      className="action-buttons"
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: "auto",
        pb: 2,
        opacity: 0.3,
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: "none",

        // כשהכרטיס עצמו ב-hover
        ".MuiPaper-root:hover &": {
          opacity: 1,
          pointerEvents: "auto",
        },
      }}
    >
      <IconButton
        onClick={onEdit}
        size="medium" // ← מוגדל
        sx={{
          color: "grey.600",
          "&:hover": {
            color: "#6c2bc6",
          },
        }}
      >
        <EditRoundedIcon fontSize="medium" />
      </IconButton>

      <IconButton
        onClick={onDelete}
        size="medium"
        sx={{
          color: "grey.600",
          "&:hover": {
            color: "#6c2bc6",
          },
        }}
      >
        <DeleteForeverIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
}
