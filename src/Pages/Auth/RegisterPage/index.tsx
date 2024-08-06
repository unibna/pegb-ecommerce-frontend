import React from "react";

import { Flex } from "antd";

import {
  RegisterForm
} from "../../../Components/Forms";


const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <Flex gap="middle" align="center" justify="center">
        <Flex vertical align="center">
          <Flex gap="middle" align="center" justify="center">
            <h1>Register</h1>
          </Flex>
          <RegisterForm />
        </Flex>
      </Flex>
    </div>
  );
};

export default RegisterPage;
