import React from "react";

import { Flex } from "antd";

import { LoginForm } from "../../../Components/Forms";


const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <Flex gap="middle" align="center" justify="center">
        <Flex vertical align="center">
          <Flex gap="middle" align="center" justify="center">
            <h1>Login</h1>
          </Flex>
          <LoginForm />
        </Flex>
      </Flex>
    </div>
  );
};

export default LoginPage;
