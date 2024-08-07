import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Alert, Button, Divider, Flex, Form, Input, Select, Switch } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { PromotionService } from "../../../Services";
import { login } from "../../../Slices/authSlice"

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
            <Button type="dashed" onClick={addCondition} icon={<PlusOutlined />} style={{
                marginBottom: "16px",
            }}>
                Add Condition
            </Button>
        </div>
    );
};



const PromotionCreateForm = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [conditionGroups, setConditionGroups] = useState([{}]);
    const [results, setResults] = useState([{}]);

    const dispatch = useDispatch();

    const addConditionGroup = () => {
        setConditionGroups([...conditionGroups, {}]);
    };

    const removeConditionGroup = (index: number) => {
        const newConditionGroups = [...conditionGroups];
        newConditionGroups.splice(index, 1);
        setConditionGroups(newConditionGroups);
    };

    const addResult = () => {
        setResults([...results, {}]);
    };

    const removeResult = (index: number) => {
        const newResults = [...results];
        newResults.splice(index, 1);
        setResults(newResults);
    };

    const onFinish = async (values: any) => {
        await handleCreatePromotion(values);
    };

    const onFinishFailed = async (errorInfo: any) => {
        setErrorMessage(errorInfo.errorFields[0].errors[0]);
    };

    const handleCreatePromotion = async (values: any) => {
        console.log(values);
        try {
            const response = await PromotionService.create(values);
            if (response) {
                navigate('/staff/promotion');
            }
        } catch (error: any) {
            console.error('Register failed:', error);
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <Form
                form={form}
                scrollToFirstError
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                labelAlign="left"
                autoComplete="on"
                initialValues={{
                    remember: true,
                }}
                style={{
                    padding: "24px",
                    paddingBlock: 32,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Flex vertical>
                    <Flex justify="flex-end">
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: "100%",
                                }}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Flex>

                    <Flex vertical>
                        {errorMessage &&
                            <Form.Item
                                wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                }}
                            >
                                <Alert
                                    message={errorMessage}
                                    type="error"
                                    showIcon
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>}

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the promotion name!",
                                },
                                {
                                    type: "string",
                                    message: "Invalid name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Switch" valuePropName="checked">
                            <Switch defaultChecked />
                        </Form.Item>

                        <Divider>Condition Groups</Divider>
                        {conditionGroups.map((_, index) => (
                            <div key={index}>
                                <Form.Item name={['condition_groups', index, 'operator']} label="Group Operator" rules={[{ required: true }]}>
                                    <Select>
                                        <Option value="AND">AND</Option>
                                        <Option value="OR">OR</Option>
                                    </Select>
                                </Form.Item>

                                <ConditionForm groupIndex={index} />

                                <Button danger type="primary" onClick={() => removeConditionGroup(index)} icon={<MinusCircleOutlined />}>
                                    Remove Condition Group
                                </Button>
                                <Divider />
                            </div>
                        ))}
                        <Button type="dashed" onClick={addConditionGroup} icon={<PlusOutlined />} style={{
                            marginTop: "16px",
                        }}>
                            Add Condition Group
                        </Button>

                        <Divider>Results</Divider>
                        {results.map((_, index) => (
                            <div key={index}>
                                <Form.Item name={['results', index, 'type']} label="Type" rules={[{ required: true }]}>
                                    <Select>
                                        <Option value="DIRECT_DISCOUNT">Direct Discount</Option>
                                        <Option value="DIRECT_PERCENTAGE">Direct Percentage</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name={['results', index, 'data_type']} label="Data Type" rules={[{ required: true }]}>
                                    <Select>
                                        <Option value="FLOAT">Float</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name={['results', index, 'value']} label="Value" rules={[{ required: true, message: "Please enter the value" }]}>
                                    <Input type="number" />
                                </Form.Item>

                                <Button danger type="primary" onClick={() => removeResult(index)} icon={<MinusCircleOutlined />}>
                                    Remove Result
                                </Button>
                                <Divider />
                            </div>
                        ))}
                        <Button type="dashed" onClick={addResult} icon={<PlusOutlined />}>
                            Add Result
                        </Button>

                    </Flex>
                </Flex>

            </Form>
        </>
    );
};

export default PromotionCreateForm;