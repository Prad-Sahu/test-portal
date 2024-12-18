import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import { ROUTERS } from "./utils/Constants";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={ROUTERS.LOGIN} element={<Login />} />
      <Route path={ROUTERS.SIGNUP} element={<Signup />} />
      <Route path="/:username" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;