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
import MyClubs from "../components/ClubManager/MyClubs";
import ClubMembers from "../components/ClubManager/ClubMembers";
import EventsManagement from "../components/ClubManager/EventsManagement";
import EventRegistrations from "../components/ClubManager/EventRegistrations";
import ManageClubs from "../components/Dashboard/Admin/ManageClubs";
import ViewPayments from "../components/Dashboard/Admin/ViewPayments";
import Clubs from "../components/Club/Clubs";
import ClubDetails from "../components/Club/ClubDetails";
import PaymentSuccess from "../components/PaymentSuccess";


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
            },
            {
                path:'/clubs',
                element:<Clubs></Clubs>
            },
            {
                path:'/clubs/:id',
                element:<ClubDetails></ClubDetails>
            },
            {
                path:"/payment-success",
                element:<PaymentSuccess></PaymentSuccess>
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
            },
            {
                path:"my-clubs",
                element:<PrivateRoute><MyClubs></MyClubs></PrivateRoute>
            },
            {
                path:"club-members",
                element:<PrivateRoute><ClubMembers></ClubMembers></PrivateRoute>
            },
            {
                path:"event-management",
                element:<PrivateRoute><EventsManagement></EventsManagement></PrivateRoute>
            },
            {
                path:"event-registrations",
                element:<PrivateRoute><EventRegistrations></EventRegistrations></PrivateRoute>
            },
            // for admin
            {
                path:"manage-clubs",
                element:<PrivateRoute><ManageClubs></ManageClubs></PrivateRoute>
            },
            {
                path:"payments",
                element:<PrivateRoute><ViewPayments></ViewPayments></PrivateRoute>
            }
        ]
    }
])
export {router};