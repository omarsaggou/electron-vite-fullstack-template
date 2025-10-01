import Login from "../pages/Login";
import { AppRoute } from "./types";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/Home";
import ProfilePage from "../pages";
import SettingsPage from "../pages/Settings";

export const routes: AppRoute[] = [
    {
        path: "/",
        element: <Login />,
        private: false,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        private: true,
        children: [
            {
                index: true, // default route inside dashboard
                element: <HomePage/>,
                label: "Home",
            },
            {
                path: "profile",
                element: <ProfilePage />,
                label: "Profile",
            },
            {
                path: "settings",
                element: <SettingsPage />,
                label: "Settings",
            },
        ],
    },
];
