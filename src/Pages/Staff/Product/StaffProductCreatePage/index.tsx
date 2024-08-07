import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { ProductForm } from "../../../../Components/Forms";


const StaffProductCreatePage: React.FC = () => {
    return (
        <div className="staff-product-create-page">
            <Flex gap="small" vertical>
                <h1>Create product</h1>
            </Flex>
            <ProductForm />
        </div>
    )
};

export default StaffProductCreatePage;
