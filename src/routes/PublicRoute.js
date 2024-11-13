import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  return user?.role === "R3" || user?.role === "R2" ? <Navigate to={"/chat"} replace /> : <Outlet />;
};

export default PublicRoute;
