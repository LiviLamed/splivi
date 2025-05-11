import { createTheme } from "@mui/material";
import { amber, grey, purple } from "@mui/material/colors";

const primary = {
  main: "#7b2b74",
  light: "#613a51",
  dark: "#9a416e",
  contrastText: "#fff",
};

const secondary = {
  main: "#b0b0b0",
  light: "#d0d0d0",
  dark: "#909090",
  contrastText: grey[800],
};

export const theme = createTheme({
  palette: {
    primary,
    secondary,
    success: { main: amber[400] },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            opacity: 0.7,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: () => ({
          "&:hover": {
            backgroundColor: grey[500],

            opacity: 0.7,
          },
        }),
      },
    },
  },
});
