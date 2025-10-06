import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(token ? true : false);
  }, []);
  return isLoggedIn ? <Outlet /> : null;
}
