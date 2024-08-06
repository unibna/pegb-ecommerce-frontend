import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { logout } from "../../../Slices/authSlice";


const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(logout());

  return (
    <Navigate to="/" />
  )
};

export default LogoutPage;
