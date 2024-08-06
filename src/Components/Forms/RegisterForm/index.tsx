import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Alert, Button, Form, Input } from "antd";
import { AuthService } from "../../../Services";


const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setErrorMessage(null);
        handleRegister(values);
    };

    const onFinishFailed = async (errorInfo: any) => {
        setErrorMessage(errorInfo.errorFields[0].errors[0]);
    };

    const handleRegister = async (values: any) => {
        try {
            const data = await AuthService.register(values);
            if (data) {
                navigate('/auth/login');
            }
        } catch (error: any) {
            console.error('Register failed:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Form
                form={form}
                scrollToFirstError
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
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

                <Form.Item
                    label="Confirmed Password"
                    name="password2"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="fist_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                        {
                            type: "string",
                            message: "Invalid first name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your last name!",
                        },
                        {
                            type: "string",
                            message: "Invalid last name!",
                        },
                    ]}
                >
                    <Input />
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
                        Sign up
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
};

export default RegisterForm;
