import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../../components/Accounts/Login/Login";
import { ROUTES } from "../../constant/Routes";
import Layout from "../Layout";

const RoutContainer = () => {
  const defaultProps = {};

  return (
    <>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Layout {...defaultProps} />} />
        <Route path={ROUTES.LOGIN} element={<Login {...defaultProps} />} />
        <Route path={"/"} element={<Navigate to={ROUTES.MAIN} />} />
        <Route path={ROUTES.NOTHING} element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default RoutContainer;
