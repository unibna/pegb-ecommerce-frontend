import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { message, Spin } from "antd";

import { AuthService } from "../../../Services";
import { setUser } from "../../../Slices/userSlice";


const HomePage: React.FC = () => {
    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const getMe = async () => {
        try {
            const fetchedUser = await AuthService.me();
            dispatch(setUser(fetchedUser));
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getMe();
        }
    }, [isLoggedIn, loading]);

    if (loading) {
        return <Spin />;
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />;
    }
    
    if (user.is_staff) {
        return <Navigate to="/auth/roles" />;
    } else {
        return <Navigate to="/customer" />;
    }
};

export default HomePage;
