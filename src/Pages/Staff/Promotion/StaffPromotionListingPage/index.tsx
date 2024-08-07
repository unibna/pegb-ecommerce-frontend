import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { PromotionTable } from "../../../../Components/Tables";

const StaffPromotionListingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="staff-promotion-listing-page">
            <Flex gap="small" vertical>
                <Flex justify="flex-end" gap="small">
                    <Button 
                        onClick={() => navigate("/staff/promotion/create")}
                    >
                        Add Promotion
                    </Button>
                </Flex>
                <PromotionTable />
            </Flex>
        </div>
    )
};

export default StaffPromotionListingPage;
