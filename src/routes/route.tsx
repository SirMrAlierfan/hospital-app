import { createBrowserRouter } from "react-router-dom";
import Leyout from "../components/leyout/Leyout";
import HomePage from "../components/homePage/homePage";



export const router = createBrowserRouter(

    [

        {
            
            path:"/",
            element:<Leyout/>,
            children:[
                {
                    index:true,
                    element:<HomePage/>
                }
            ]

        }
    ]
)