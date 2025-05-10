import { createTheme } from "@mui/material";
import { amber, grey, purple } from "@mui/material/colors";

const primary = {
  main: "#9356a6",
  light: purple[100],
  dark: purple[700],
  contrastText: grey[800],
};

const secondary = {
  main: "#1976d2",
  light: "#42a5f5",
  dark: "#1565c0",
  contrastText: "#fff",
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
