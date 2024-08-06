import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Alert, Button, Form, Input } from "antd";
import { AuthService } from "../../../Services";
import { login } from "../../../Slices/authSlice"


const Login = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        await handleLogin(values);
    };

    const onFinishFailed = async (errorInfo: any) => {
        setErrorMessage(errorInfo.errorFields[0].errors[0]);
    };

    const handleLogin = async (values: any) => {
        const { email, password } = values;
        try {
            const tokenPair = await AuthService.login(email, password);
            localStorage.setItem('accessToken', tokenPair['access'])
            localStorage.setItem('refreshToken', tokenPair['refresh'])
            dispatch(login());
            navigate('/');
        } catch (error: any) {
            setErrorMessage('Invalid username or password');
        }
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Form
                form={form}
                scrollToFirstError
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                labelAlign="left"
                autoComplete="on"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: "600px",
                    padding: "24px",
                    paddingBlock: 32,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                        {
                            type: "email",
                            message: "Invalid email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {errorMessage &&
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Alert
                            message={errorMessage}
                            type="error"
                            showIcon
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>}

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: "100%",
                        }}
                    >
                        Sign in
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
};

export default Login;
