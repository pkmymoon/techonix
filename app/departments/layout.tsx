import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function DepartmentsLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(token !== "" ? true : false);
  }, []);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
