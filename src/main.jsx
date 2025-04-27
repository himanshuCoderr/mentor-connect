import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoginProvider } from "./Context/LoginContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import RequestMentorship from "./pages/PostYourRequirement";
import MyRequirement from "./pages/MyRequirement";
import MentorProfile from "./pages/MentorProfile";
import UserProfile from "./pages/UserProfile";
import MentorProfileCreation from "./pages/MentorProfileCreation";
import OTP from "./pages/Otp";
import FindMentors from "./pages/FindMentors";
import MentorDashboard from "./pages/MentorDashboard";
import RequirementDetail from "./pages/RequirementDetail";
import AdminDashboard from "../src/admin/AdminDashboard";
import ViewMentorDetails from "./admin/ViewMentorDetails";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/findMentors",
    element: <FindMentors />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/postRequirement",
    element: <RequestMentorship />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/mentorProfileCreate",
    element: <MentorProfileCreation />,
  },
  {
    path: "/verify",
    element: <OTP />,
  },
  {
    path: "/mentorProfile",
    element: <MentorProfile />,
  },
  {
    path: "/myRequirement",
    element: <MyRequirement />,
  },
  {
    path: "/studentProfile",
    element: <UserProfile />,
  },
  {
    path: "/mentorDashboard",
    element: <MentorDashboard />,
  },
  {
    path: "/requirementDetail/:requirementId",
    element: <RequirementDetail />,
  },
  {
    path: "adminDashBoard",
    element: <AdminDashboard />,
  },
  {
    path: "/viewMentorDetails/:id",
    element: <ViewMentorDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>
);
