import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoutes = () => {
  const userId = localStorage.getItem("userId");
  const isAdmin = userId === process.env.REACT_APP_ADMIN_ID;
  return isAdmin ? <Outlet></Outlet> : <Navigate to={"/404"}></Navigate>;
};

export default ProtectRoutes;
