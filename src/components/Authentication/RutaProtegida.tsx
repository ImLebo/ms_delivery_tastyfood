import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const RutaProtegida = () => {
    const isAuth = localStorage.getItem("usuarioGoogle");
    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};