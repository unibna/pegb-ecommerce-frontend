import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Flex, message, Spin, Typography } from "antd";

import { AuthService } from "../../../Services";

const { Text } = Typography;


const ActivationPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activation_token = queryParams.get("activation_token") || "";
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleActivation = async () => {
    try {
      const data = await AuthService.activate(activation_token);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (loading) {
      handleActivation();
    }
  }, []);

  if (!loading && !errorMessage && activation_token) {
    message.success("Activation success");
    navigate("/auth/login");
  }

  return (
    <div className="register-page">
      <Flex gap="small" align="center" justify="center">
        <Flex vertical gap="large" align="center">
          <Flex align="center" justify="center" vertical>
            {errorMessage && activation_token ?
              <Text type="danger">Your activation is failed!</Text>
              : <Text disabled>Please wait a minute to activate your account</Text>
            }
          </Flex>
          {loading && activation_token && <Spin />}
        </Flex>
      </Flex>
    </div>
  );
};

export default ActivationPage;
