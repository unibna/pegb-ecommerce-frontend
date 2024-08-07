import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { PromotionForm } from "../../../../Components/Forms";


const StaffPromotionCreatePage: React.FC = () => {
    return (
        <div className="staff-promotion-listing-page">
            <Flex gap="small" vertical>
                <h1>Create promotion</h1>
                <PromotionForm />
            </Flex>
        </div>
    )
};

export default StaffPromotionCreatePage;
