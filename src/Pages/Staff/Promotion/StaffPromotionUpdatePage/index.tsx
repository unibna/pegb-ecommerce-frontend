import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { PromotionForm } from "../../../../Components/Forms";


const StaffPromotionUpdatePage: React.FC = () => {
    return (
        <div className="staff-promotion-update-page">
            <Flex gap="small" vertical>
                <h1>Update promotion</h1>
                <PromotionForm isEdit/>
            </Flex>
        </div>
    )
};

export default StaffPromotionUpdatePage;
