import React from "react";
import Navbar from "../components/global/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
    const location= useLocation();
  return (
    <>
      {location.pathname!== "/login" && location.pathname !== "/register" && <Navbar />}
      <Outlet />
    </>
  );
};

export default Home;