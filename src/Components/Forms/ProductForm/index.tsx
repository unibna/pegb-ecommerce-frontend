import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Flex, Form, Input, Button, Select, Switch, Divider, Alert } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { PromotionService } from "../../../Services";


const { TextArea } = Input;
const { Option } = Select;


const ProductForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
    return <></>
}

export default ProductForm;