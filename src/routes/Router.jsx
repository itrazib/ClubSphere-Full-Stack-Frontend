import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import Error from "../components/ErrorPage/Error";
import Loading from "../components/Loader/Loading";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Statistics from "../components/Dashboard/Common/Statistics";
import ManageUsers from "../components/Dashboard/Admin/ManageUsers";

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
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Register></Register>
            }
        ]


    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                index:true,
                element:<Statistics></Statistics>
            },
            {
                path:"manage-users",
                element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
            }
        ]
    }
])
export {router};