import { alpha, Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 40,
  padding: theme.spacing(10),
  borderRadius: 16,
  backgroundColor: alpha("#E8E1FD", 0.5),
  border: "1.5px solid #b653d4",
  position: "relative",
  margin: "0 auto",
  width: "100%",
  maxWidth: 400,
  [theme.breakpoints.up("md")]: {
    maxWidth: "32%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "48%",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));
