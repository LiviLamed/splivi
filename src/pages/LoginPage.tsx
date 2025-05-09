import LockPersonIcon from "@mui/icons-material/LockPerson";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/User";
import Credentials from "../models/Credentials";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { login } from "../redux/usersSlice";

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<Credentials>();
  const { errors } = formState;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((store) => store.users.users);

  function handleLogin({ email, password }: Credentials) {
    const existingUser = users.find(
      (user: User) => user.email === email && user.password === password,
    );

    if (!existingUser) {
      alert("Invalid email or password.");
      return;
    }

    dispatch(login(existingUser));
    navigate("/home");
  }

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "458px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockPersonIcon />
      </Avatar>

      <Typography variant="h5">Login</Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid>
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
