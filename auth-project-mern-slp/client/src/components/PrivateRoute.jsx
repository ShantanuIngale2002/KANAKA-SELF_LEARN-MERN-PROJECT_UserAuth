import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    // by app.jsx, <Profile /> is children to be replaced by <Outlet /> here
    //console.log(currentUser);
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
