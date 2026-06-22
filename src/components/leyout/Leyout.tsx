import { Outlet } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"



const Leyout = () => {

    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default Leyout