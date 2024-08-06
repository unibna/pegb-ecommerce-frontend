import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { CategoryTable } from "../../../../Components/Tables";


const StaffCategoryListingPage: React.FC = () => {
    return (
        <div className="staff-category-listing-page">
            <Flex gap="small" vertical>
                <Flex justify="flex-end" gap="small">
                    <Button>Add Category</Button>
                </Flex>
                <CategoryTable />
            </Flex>
        </div>
    )
};

export default StaffCategoryListingPage;
