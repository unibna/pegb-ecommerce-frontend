import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Form, Input, Button, message, Select, Switch, Divider, Alert } from "antd";
import { ProductService } from "../../../Services";

const { TextArea } = Input;
const { Option } = Select;

const ProductForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useDispatch();

    const fetchProductData = async (productId: string) => {
        try {
            console.log("Fetching product data...");
            const productData = await ProductService.get(productId);
            form.setFieldsValue(productData);
        } catch (error) {
            message.error("Failed to fetch product data");
        }
    };

    const onFinish = async (values: any) => {
        if (isEdit && id) {
            await handleUpdateProduct(id, values);
        } else {
            await handleCreateProduct(values);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        setErrorMessage(errorInfo.errorFields[0].errors[0]);
    };

    const handleCreateProduct = async (values: any) => {
        console.log(values);
        try {
            const response = await ProductService.create(values);
            if (response) {
                navigate('/staff/product');
            }
        } catch (error: any) {
            message.error('Failed to create the product');
            setErrorMessage(error.message);
        }
    };

    const handleUpdateProduct = async (productId: string, values: any) => {
        console.log(values);
        try {
            const response = await ProductService.update(productId, values);
            if (response) {
                navigate('/staff/product');
            }
        } catch (error: any) {
            message.error('Failed to update the product');
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        if (isEdit && id) {
            fetchProductData(id);
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
                            label="Category"
                            name="category"
                            rules={[
                                { required: true, message: "Please input the category!" },
                                { type: "number", message: "Invalid category!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: "Please input the product name!" },
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

export default ProductForm;
