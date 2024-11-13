import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const MonitorRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user || (user.role !== "R2" && user.role !== "R3")) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default MonitorRoute;
