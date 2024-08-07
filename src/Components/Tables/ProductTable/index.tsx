import React, { useEffect, useState } from "react";
import { Flex, message, Spin, Table, Button } from "antd";
import { ProductService } from "../../../Services";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const ProductTable: React.FC<any> = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const columns = [
        {
            title: <Flex justify="center">ID</Flex>,
            key: "id",
            width: "10%",
            render: (product: any) => <Flex justify="center">{product.id}</Flex>,
        },
        {
            title: <Flex justify="center">Name</Flex>,
            key: "name",
            width: "30%",
            render: (product: any) => <Flex justify="center">{product.name}</Flex>,
        },
        {
            title: <Flex justify="center">Description</Flex>,
            key: "description",
            width: "50%",
            render: (product: any) => <Flex justify="center">{product.description}</Flex>,
        },
        {
            title: <Flex justify="center">Actions</Flex>,
            key: "actions",
            width: "10%",
            render: (product: any) => (
                <Flex justify="center">
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        onClick={() => navigate(`/staff/product/update/${product.id}`)}
                    />
                </Flex>
            ),
        },
    ];

    const fetchDataSource = async () => {
        try {
            const products = await ProductService.list();
            setDataSource(products);
        } catch (error) {
            message.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            fetchDataSource();
        }
    }, [loading]);

    if (loading) {
        return <Spin />;
    }

    return <Table columns={columns} dataSource={dataSource} />;
};

export default ProductTable;
