import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "../../mui-theme/mui-theme";
import { grey, purple } from "@mui/material/colors";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({
  onToggleSidebar,
  isSidebarOpen,
}: HeaderProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 6 }}>
        {!isSidebarOpen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onToggleSidebar}
          >
            <MenuIcon />
          </IconButton>
        )}

        {location.pathname !== "/" && location.pathname !== "/home" && (
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: grey[100],
              color: grey[100],
              fontWeight: 600,
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: purple[500],
                color: purple[500],
                backgroundColor: grey[300],
              },
            }}
          >
            ← Home
          </Button>
        )}

        <Typography variant="h5" sx={{ fontWeight: 500, ml: 14 }}>
          Splivi
        </Typography>

        <Box display="flex" alignItems="center" gap={6} sx={{ mr: 14 }}>
          {currentUser && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                mr: 10,
                textTransform: "capitalize",
              }}
            >
              {currentUser.name}
            </Typography>
          )}
          <Button
            color="inherit"
            onClick={() => {
              dispatch(logout());
              navigate("/auth/login", { replace: true });
            }}
            sx={{
              border: "1px solid white",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "white",
                color: "#b653d4",
                borderColor: "white",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
