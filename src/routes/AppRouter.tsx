import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../layouts/main-layout/MainLayout";
import GroupsPage from "../pages/GroupsPage";
import GroupPage from "../pages/GroupPage";

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <MainLayout />, // זה ה-Layout הראשי
//         children: [
//             { path: "", element: <HomePage /> }, // "/" - עמוד הבית
//             { path: "about", element: <AboutPage /> }, // "/about"
//         ],
//     },
//     {
//         path: "*",
//         element: <NotFoundPage />,
//     },
// ]);

//
// export const router = createBrowserRouter([{
//     path: "/",
//
// }])

export default function AppRouting() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/groups" replace />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupPage />} />
      </Route>
    </Routes>
  );
}
