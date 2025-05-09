import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/usersSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "#b653d4" }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 6 }}>
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
              navigate("/login");
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
