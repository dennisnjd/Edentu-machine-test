import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import Staffprofile from "./Components/StaffProfile/Staffprofile";
import Login from "./Components/Login/Login";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import HomePage from "./Components/HomePage/HomePage";
import GatePassVisualisation from "./Components/Chart/GatePassVisualisation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create",
    element: <Staffprofile />
  },
  {
    path: "/updateProfile",
    element: <UpdateProfile />
  },
  {
    path: "/reset",
    element: <ForgetPassword />
  },
  {
    path:"/chart",
    element:<GatePassVisualisation/>
  }
]
);

export default router;   