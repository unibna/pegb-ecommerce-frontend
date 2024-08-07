import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Select, Switch, Divider, Alert } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AuthService } from "../../../Services";
import { login } from "../../../Slices/authSlice";

const { Option } = Select;

const ConditionForm: React.FC<{ groupIndex: number }> = ({ groupIndex }) => {
    const [form] = Form.useForm();
    const [conditions, setConditions] = useState([{}]);

    const addCondition = () => {
        setConditions([...conditions, {}]);
    };

    const removeCondition = (index: number) => {
        const newConditions = [...conditions];
        newConditions.splice(index, 1);
        setConditions(newConditions);
    };

    return (
        <div>
            {conditions.map((_, index) => (
                <div key={index}>
                    <Form.Item name={['condition_groups', groupIndex, 'conditions', index, 'field']} label="Field" rules={[{ required: true }]}>
                        <Select>
                            <Option value="PRODUCT">Product</Option>
                            <Option value="MEMBERSHIP">Membership</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={['condition_groups', groupIndex, 'conditions', index, 'data_type']} label="Data Type" rules={[{ required: true }]}>
                        <Select>
                            <Option value="ID">ID</Option>
                            <Option value="INT">Int</Option>
                            <Option value="FLOAT">Float</Option>
                            <Option value="STRING">String</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={['condition_groups', groupIndex, 'conditions', index, 'operator']} label="Operator" rules={[{ required: true }]}>
                        <Select>
                            <Option value="EQUAL">Equal</Option>
                            <Option value="NOT_EQUAL">Not equal</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={['condition_groups', groupIndex, 'conditions', index, 'value']} label="Value" rules={[{ required: true, message: "Please enter the value" }]}>
                        <Input />
                    </Form.Item>

                    <Button danger type="primary" onClick={() => removeCondition(index)} icon={<MinusCircleOutlined />}>
                        Remove Condition
                    </Button>
                    <Divider />
                </div>
            ))}
            <Button type="dashed" onClick={addCondition} icon={<PlusOutlined />} style={{ marginBottom: "16px" }}>
                Add Condition
            </Button>
        </div>
    );
};

export default ConditionForm;