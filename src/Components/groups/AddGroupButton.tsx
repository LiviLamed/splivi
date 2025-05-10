import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
// import CreateGroupModal from "./CreateGroupModal";

interface AddGroupButtonProps {
  size?: "small" | "medium" | "large";
}

export default function AddGroupButton({
  size = "medium",
}: AddGroupButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton size={size} onClick={() => setIsModalOpen(true)}>
        <AddIcon />
      </IconButton>
      {/*<CreateGroupModal*/}
      {/*  open={isModalOpen}*/}
      {/*  onClose={() => setIsModalOpen(false)}*/}
      {/*/>*/}
    </>
  );
}
