import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { ProductTable } from "../../../../Components/Tables";


const StaffProductListingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="staff-product-listing-page">
            <Flex gap="small" vertical>
                <Flex justify="flex-end" gap="small">
                    <Button
                        onClick={() => navigate("/staff/product/create")}
                    >
                        Add Product
                    </Button>
                </Flex>
                <ProductTable />
            </Flex>
        </div>
    )
};

export default StaffProductListingPage;
