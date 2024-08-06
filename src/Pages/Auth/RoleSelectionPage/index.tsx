import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card, Flex } from 'antd';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';

import { SquareButton } from '../../../Components/Buttons';
import { setRole } from "../../../Slices/authSlice"
import { RoleEnum } from '../../../Enums';


const RoleSelectionPage: React.FC = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleStaffLogin = () => {
    dispatch(setRole(RoleEnum.STAFF));
    navigate('/staff');
  }

  const handleCustomerLogin = () => {
    dispatch(setRole(RoleEnum.CUSTOMER));
    navigate('/customer');
  }

  if (!isLoggedIn) {
    navigate('/');
  }

  return (
    <div className='role-selection-page'>
      <Flex gap='middle' align='center' justify='center'>
        <Flex vertical align='center'>

          <Flex gap='middle' align='center' justify='center'>
            <h1>Please select your role</h1>
          </Flex>

          <Card style={{ width: 300 }}>
            <Flex gap='middle' align='center' justify='center'>
              
              <Flex justify='center' align='center' vertical>
                <SquareButton
                  icon={<UserOutlined />}
                  width={100}
                  onClick={handleCustomerLogin}
                />
                <div style={{
                  textAlign: 'center',
                }}>
                  <h3>Customer</h3>
                </div>
              </Flex>

              <Flex justify='center' align='center' vertical>
                <SquareButton
                  icon={<LaptopOutlined />}
                  width={100}
                  onClick={handleStaffLogin}
                />
                <div style={{
                  textAlign: 'center',
                }}>
                  <h3>Staff</h3>
                </div>
              </Flex>

            </Flex>
          </Card>

        </Flex>
      </Flex>
    </div>
  );
};

export default RoleSelectionPage;
