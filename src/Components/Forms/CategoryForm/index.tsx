import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Form, Input, Button, message, Select, Switch, Divider, Alert } from "antd";
import { CategoryService } from "../../../Services";

const { TextArea } = Input;
const { Option } = Select;

const CategoryForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
    let navigate = useNavigate();
    const { department } = useSelector((state: any) => state.user);
    const { id } = useParams();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [defaultDepartment, setDefaultDepartment] = useState<string | null>(null);

    const dispatch = useDispatch();

    const fetchCategoryData = async (categoryId: string) => {
        try {
            console.log("Fetching category data...");
            const categoryData = await CategoryService.get(categoryId);
            setDefaultDepartment(categoryData.department);
            form.setFieldsValue(categoryData);
        } catch (error) {
            message.error("Failed to fetch category data");
        }
    };

    const onFinish = async (values: any) => {
        if (isEdit && id) {
            await handleUpdateCategory(id, values);
        } else {
            await handleCreateCategory(values);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        setErrorMessage(errorInfo.errorFields[0].errors[0]);
    };

    const handleCreateCategory = async (values: any) => {
        console.log(values);
        try {
            const response = await CategoryService.create(values);
            if (response) {
                navigate('/staff/category');
            }
        } catch (error: any) {
            message.error('Failed to create the category');
            setErrorMessage(error.message);
        }
    };

    const handleUpdateCategory = async (categoryId: string, values: any) => {
        console.log(values);
        try {
            const response = await CategoryService.update(categoryId, values);
            if (response) {
                navigate('/staff/category');
            }
        } catch (error: any) {
            message.error('Failed to update the category');
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        if (isEdit && id) {
            fetchCategoryData(id);
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
                            label="Department"
                            name="department"
                            initialValue={defaultDepartment || department}
                            rules={[
                                { required: true, message: "Please input the department!" },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: "Please input the category name!" },
                                { type: "string", message: "Invalid name!" },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <TextArea placeholder="textarea with clear icon" allowClear />
                        </Form.Item>

                        <Form.Item label="Is Enabled" name="is_enabled" valuePropName="checked">
                            <Switch defaultChecked />
                        </Form.Item>

                    </Flex>
                </Flex>
            </Form>
        </>
    );
};

export default CategoryForm;
