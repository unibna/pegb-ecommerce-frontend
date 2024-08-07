import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Flex, Button } from "antd";
import { CategoryForm } from "../../../../Components/Forms";


const StaffCategoryEditPage: React.FC = () => {
    return (
        <div className="staff-category-edit-page">
            <Flex gap="small" vertical>
                <h1>Edit category</h1>
                <CategoryForm isEdit/>
            </Flex>
        </div>
    )
};

export default StaffCategoryEditPage;
