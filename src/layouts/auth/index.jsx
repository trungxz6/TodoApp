import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Authlayout = () => {
    const crrUser = localStorage.getItem('crrUser');
    if (crrUser) {
        return <Navigate to={'home'} />
    }
    return (
        <div className="container-auth-layout">Login
            <Outlet />
        </div>
    )

}

export default Authlayout;