import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { CategoryForm } from "../../../../Components/Forms";


const StaffCategoryCreatePage: React.FC = () => {
    return (
        <div className="staff-category-create-page">
            <Flex gap="small" vertical>
                <h1>Create category</h1>
                <CategoryForm/>
            </Flex>
        </div>
    )
};

export default StaffCategoryCreatePage;
