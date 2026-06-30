import { createBrowserRouter } from "react-router-dom";
import Leyout from "../components/leyout/Leyout";
import HomePage from "../components/homePage/homePage";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";



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
                }
            ]

        }
    ]
)