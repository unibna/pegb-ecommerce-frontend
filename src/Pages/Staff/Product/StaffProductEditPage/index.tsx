import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { ProductForm } from "../../../../Components/Forms";


const StaffProductEditPage: React.FC = () => {
    return (
        <div className="staff-product-edit-page">
            <Flex gap="small" vertical>
                <h1>Update product</h1>
                <ProductForm isEdit/>
            </Flex>
        </div>
    )
};

export default StaffProductEditPage;
