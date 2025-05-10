import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../layouts/main-layout/MainLayout";
import GroupsPage from "../pages/GroupsPage";
import GroupPage from "../pages/GroupPage";
import PageNotFound from "../pages/PageNotFound";
import HomePage from "../pages/HomePage";

export const AppRouting = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "groups/:groupId", element: <GroupPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />,
  },

  { path: "*", element: <PageNotFound /> },
]);
