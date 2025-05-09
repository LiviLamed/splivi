import { Grid, Paper } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";

export default function AuthLayout() {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        component="div"
        size={7}
        sx={{
          backgroundImage: "url(https://picsum.photos/1600/900)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
        }}
      />
      <Grid
        size={5}
        component={Paper}
        elevation={6}
        square
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
}
