import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, InputNumber, Divider, Alert } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { ProductService, MembershipService } from "../../../Services";

const { Option } = Select;

const ConditionForm: React.FC<{ groupIndex: number }> = ({ groupIndex }) => {
    const [form] = Form.useForm();
    const [conditions, setConditions] = useState([{}]);
    const [products, setProducts] = useState([]);
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        fetchProductData();
        fetchMembershipData();
    }, []);

    const fetchProductData = async () => {
        try {
            const productData = await ProductService.list();
            setProducts(productData);
        } catch (error) {
            message.error("Failed to fetch product data");
        }
    };

    const fetchMembershipData = async () => {
        try {
            const membershipData = await MembershipService.list();
            setMemberships(membershipData);
        } catch (error) {
            message.error("Failed to fetch membership data");
        }
    };

    const addCondition = () => {
        setConditions([...conditions, {}]);
    };

    const removeCondition = (index: number) => {
        const newConditions = [...conditions];
        newConditions.splice(index, 1);
        setConditions(newConditions);
    };

    const renderValueInput = (field: string, data_type: string) => {
        if (field === 'PRODUCT') {
            return (
                <Form.Item name={['condition_groups', groupIndex, 'conditions', 'value']} label="Value" rules={[{ required: true, message: "Please select a product" }]}>
                    <Select placeholder="Select a product">
                        {products.map((product: any) => (
                            <Option key={product.id} value={product.id}>{product.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
            );
        } else if (field === 'MEMBERSHIP') {
            return (
                <Form.Item name={['condition_groups', groupIndex, 'conditions', 'value']} label="Value" rules={[{ required: true, message: "Please select a membership" }]}>
                    <Select placeholder="Select a membership">
                        {memberships.map((membership: any) => (
                            <Option key={membership.id} value={membership.id}>{membership.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
            );
        } else if (data_type === 'INT' || data_type === 'FLOAT') {
            return (
                <Form.Item name={['condition_groups', groupIndex, 'conditions', 'value']} label="Value" rules={[{ required: true, message: "Please enter a value" }]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
            );
        } else if (data_type === 'STRING') {
            return (
                <Form.Item name={['condition_groups', groupIndex, 'conditions', 'value']} label="Value" rules={[{ required: true, message: "Please enter a value" }]}>
                    <Input />
                </Form.Item>
            );
        }
        return null;
    };

    return (
        <div>
            {conditions.map((_, index) => (
                <Form.Item key={index}>
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

                    <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues['condition_groups'] !== currentValues['condition_groups']}>
                        {({ getFieldValue }) => {
                            const field = getFieldValue(['condition_groups', groupIndex, 'conditions', index, 'field']);
                            const data_type = getFieldValue(['condition_groups', groupIndex, 'conditions', index, 'data_type']);
                            return renderValueInput(field, data_type);
                        }}
                    </Form.Item>

                    <Button danger type="primary" onClick={() => removeCondition(index)} icon={<MinusCircleOutlined />}>
                        Remove Condition
                    </Button>
                    <Divider />
                </Form.Item>
            ))}
            <Button type="dashed" onClick={addCondition} icon={<PlusOutlined />} style={{ marginBottom: "16px" }}>
                Add Condition
            </Button>
        </div>
    );
};

export default ConditionForm;
