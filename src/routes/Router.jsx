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
import Events from "../components/Events/Events";
import EventDetails from "../components/Events/EventDetails";
import Profile from "../components/Profile/Profile";
import MemberClubs from "../components/Member/MemberClubs";
import MyEvents from "../components/Member/MyEvents";
import PaymentHistory from "../components/Member/PaymentHistory";
import PrivacyPolicy from "../pages/privacy/PrivacyPolicy";
import Terms from "../pages/terms/Terms";


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
            },
            {
                path:'/events',
                element:<Events></Events>
            },
            {
                path:'/eventDetails/:id',
                element:<EventDetails></EventDetails>
            },
            {
                path:'/privacy-policy',
                element:<PrivacyPolicy></PrivacyPolicy>
            },
            {
                path:'/terms',
                element:<Terms></Terms>
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
                element:<ManageUsers></ManageUsers>
            },
            {
                path:"my-clubs",
                element:<MyClubs></MyClubs>
            },
            {
                path:"club-members",
                element:<ClubMembers></ClubMembers>
            },
            {
                path:"event-management",
                element:<EventsManagement></EventsManagement>
            },
            {
                path:"event-registrations",
                element:<EventRegistrations></EventRegistrations>
            },
            // for admin
            {
                path:"manage-clubs",
                element:<ManageClubs></ManageClubs>
            },
            {
                path:"payments",
                element:<ViewPayments></ViewPayments>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
                path:"member-clubs",
                element:<MemberClubs></MemberClubs>
            },
            {
                path:"member-events",
                element:<MyEvents></MyEvents>
            },
            {
                path:"member-payments",
                element:<PaymentHistory></PaymentHistory>
            }
        ]
    }
])
export {router};