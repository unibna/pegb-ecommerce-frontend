import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { AuthService } from "../../../Services";
import { setUser } from "../../../Slices/userSlice";


const CustomerHomePage: React.FC = () => {
    return <>
        <h1>Customer HomePage</h1>
    </>
};

export default CustomerHomePage;
