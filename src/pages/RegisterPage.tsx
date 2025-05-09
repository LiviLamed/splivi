import GroupsIcon from "@mui/icons-material/Groups";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { emailRegex } from "../services/utils";
import { User } from "../models/User";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { register as registerAction } from "../redux/usersSlice";

const RegisterPage = () => {
  const { register, handleSubmit, formState } = useForm<Omit<User, "id">>();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((store) => store.users.users);

  function send(user: Omit<User, "id">) {
    const existing = users.find((u) => u.email === user.email);
    if (existing) {
      alert("A user with this email already exists.");
      return;
    }

    const newUser: User = { ...user, id: uuid() };
    dispatch(registerAction(newUser));
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
        <GroupsIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Register
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(send)}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          autoFocus
          {...register("name", { required: "Name must be provided." })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          {...register("email", {
            required: "Email must be provided.",
            pattern: {
              value: emailRegex,
              message: "Please enter a valid email address.",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password must be provided.",
            minLength: {
              value: 4,
              message: "Password must have at least 4 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid>
            <Link to="/login">{"Already have an account? Login"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
