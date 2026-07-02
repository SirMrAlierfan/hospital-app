import { createBrowserRouter } from "react-router-dom";
import Leyout from "../components/leyout/Leyout";
import HomePage from "../components/homePage/homePage";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import { ProtectedRoute } from "./protectRoutes";
import BaseProfile from "@/components/profile/baseProfile";



export const router = createBrowserRouter(

    [

        {

            path: "/",
            element: <Leyout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/signUp",
                    element: <Register />
                },
                 {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: "/profile",
                            element: <BaseProfile />
                        }
                    ]
                }
            ]

        }
    ]
)