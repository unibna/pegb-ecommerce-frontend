import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Flex, Form, Input, Button, Select, Switch, Divider, Alert } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { PromotionService } from "../../../Services";
import ConditionForm from "./ConditionForm";


const { TextArea } = Input;
const { Option } = Select;


const PromotionForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [conditionGroups, setConditionGroups] = useState([{}]);
    const [results, setResults] = useState([{}]);

    const dispatch = useDispatch();

    const fetchPromotionData = async (promotionId: string) => {
        try {
            console.log("Fetching promotion data...");
            const promotionData = await PromotionService.get(promotionId);
            form.setFieldsValue(promotionData);
            setConditionGroups(promotionData.condition_groups || [{}]);
            setResults(promotionData.results || [{}]);
        } catch (error) {
            console.error("Error fetching promotion data:", error);
        }
    };

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
        if (isEdit) {
            await handleUpdatePromotion(values);
        } else {
            await handleCreatePromotion(values);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
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
            console.error('Failed to create a new promotion:', error);
            setErrorMessage(error.message);
        }
    }

    const handleUpdatePromotion = async (values: any) => {
        console.log(values);
        try {
            const response = await PromotionService.update(values);
            if (response) {
                navigate('/staff/promotion');
            }
        } catch (error: any) {
            console.error('Failed to update the promotion:', error);
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (isEdit && id) {
            fetchPromotionData(id);
        }
    }, [isEdit, id]);

    return (
        <>
            <Form
                form={form}
                scrollToFirstError
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                labelAlign="left"
                autoComplete="on"
                initialValues={{ remember: true }}
                style={{ padding: "24px", paddingBlock: 32 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Flex vertical>
                    <Flex justify="flex-end">
                        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                {isEdit ? "Update" : "Create"}
                            </Button>
                        </Form.Item>
                    </Flex>

                    <Flex vertical>
                        {errorMessage && (
                            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                <Alert message={errorMessage} type="error" showIcon style={{ width: "100%" }} />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: "Please input the promotion name!" },
                                { type: "string", message: "Invalid name!" },
                            ]}
                        >
                            <Input allowClear/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <TextArea placeholder="textarea with clear icon" allowClear/>
                        </Form.Item>

                        <Form.Item label="Enabled" name="is_enabled" valuePropName="checked">
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
                        <Button type="dashed" onClick={addConditionGroup} icon={<PlusOutlined />} style={{ marginTop: "16px" }}>
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

export default PromotionForm;
