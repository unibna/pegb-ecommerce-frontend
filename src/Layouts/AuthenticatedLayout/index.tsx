import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

import { Button, Flex, Layout, theme } from "antd";
import { AuthService } from "../../Services";
import { login } from "../../Slices/authSlice";

const { Header, Content } = Layout;
const defaultLayoutStyle = {
  minHeight: "calc(100vh)",
};
const contentStyle = {
  maxHeight: "calc(100vh - 112px)",
};

const DefaultLayout: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const user: any = useSelector((state: any) => state.user);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (AuthService.isLoggedIn()) {
      dispatch(login())
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  
  return (
    <Layout style={defaultLayoutStyle}>
      <Layout>
        <Header
          style={{
            padding: "10px",
            background: colorBgContainer,
          }}
        >
          <Flex justify="space-between" align="center" gap="middle" style={{ marginTop: "-30px" }}>

            <Flex className="header-logo" align="center" gap="middle" >
              <h1>Pegb E-commerce</h1>
            </Flex>

            <Flex className="header-navigator" align="center" gap="small" justify="flex-end" >
              <Button
                type="default"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
              {isLoggedIn ?
                <Button
                  type="primary"
                  onClick={() => navigate("/auth/logout")}
                  danger
                >
                  Logout
                </Button> :
                <Button
                  type="primary"
                  onClick={() => navigate("/auth/login")}
                >
                  login
                </Button>
              }
            </Flex>
          </Flex>
        </Header>

        <Content style={contentStyle}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              margin: "24px 16px 0",
              minHeight: "calc(100vh - 112px)",
              padding: 24,
              overflowY: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
