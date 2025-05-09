import { alpha, Chip, styled } from "@mui/material";

export const UserChip = styled(Chip)(() => ({
  backgroundColor: alpha("#b653d4", 0.2),
  border: "1px solid #b653d4",
  color: "#4b007d",
  fontWeight: 500,
  minWidth: 140,
  paddingInline: 12,
  justifyContent: "space-between",
  paddingTop: 4,
  paddingBottom: 4,
}));

export const BoldUserChip = styled(Chip)(() => ({
  backgroundColor: alpha("#b653d4", 0.2),
  border: "2px solid #4b007d",
  color: "#4b007d",
  fontWeight: 700,
  minWidth: 140,
  paddingInline: 12,
  justifyContent: "space-between",
  paddingTop: 4,
  paddingBottom: 4,
}));

export const CurrentUserChip = styled(Chip)(() => ({
  backgroundColor: alpha("#3399cc", 0.2),
  border: "1px solid #3399cc",
  color: "#004466",
  fontWeight: 500,
  minWidth: 140,
  paddingInline: 12,
  justifyContent: "space-between",
  paddingTop: 4,
  paddingBottom: 4,
}));

export const CurrentBoldUserChip = styled(Chip)(() => ({
  backgroundColor: alpha("#3399cc", 0.2),
  border: "2px solid #004466",
  color: "#004466",
  fontWeight: 700,
  minWidth: 140,
  paddingInline: 12,
  justifyContent: "space-between",
  paddingTop: 8,
  paddingBottom: 8,
}));
