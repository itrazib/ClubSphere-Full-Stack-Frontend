import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home></Home>
    }
])
export {router};