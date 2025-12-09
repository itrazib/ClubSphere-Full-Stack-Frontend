import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import Error from "../components/ErrorPage/Error";
import Loading from "../components/Loader/Loading";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        errorElement:<Error></Error>,
        hydrateFallbackElement:<Loading></Loading>,
        children:[
            {
                index:true,
                element:<Home></Home>
            }
        ]


    }
])
export {router};