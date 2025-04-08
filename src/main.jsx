import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Login from './pages/LoginPage'
import RequestMentorship from './pages/PostYourRequirement'
import MyRequirement from './pages/MyRequirement'
import MentorProfile from './pages/MentorProfile'
import UserProfile from './pages/UserProfile'
import MentorProfileCreation from './pages/MentorProfileCreation'
import OTP from './pages/Otp'
import FindMentors from './pages/FindMentors'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/findMentors",
        element: <FindMentors />
    },
    {
        path: "/login",
        element: <Login />,
    }, {
        path: "/postRequirment",
        element: <RequestMentorship />
    }, {
        path: "/signup",
        element: <Signup />
    }, {
        path: "/mentorProfileCreate",
        element: <MentorProfileCreation />
    },
    {
        path: "/verify",
        element: <OTP />
    },
    {
        path: "/mentorProfile",
        element: <MentorProfile />
    },
    {
        path: "/myRequirement",
        element: <MyRequirement />
    },
    {
        path: "/studentProfile",
        element: <UserProfile />
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
