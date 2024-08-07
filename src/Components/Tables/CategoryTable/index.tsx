import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Flex, message, Spin, Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { CategoryService } from "../../../Services";


const CategoryTable: React.FC<any> = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const columns = [
        {
            title: <Flex justify="center">ID</Flex>,
            key: "id",
            width: "10%",
            render: (category: any) => <Flex justify="center">{category.id}</Flex>,
        },
        {
            title: <Flex justify="center">Name</Flex>,
            key: "name",
            width: "30%",
            render: (category: any) => <Flex justify="center">{category.name}</Flex>,
        },
        {
            title: <Flex justify="center">Description</Flex>,
            key: "description",
            width: "50%",
            render: (category: any) => <Flex justify="center">{category.description}</Flex>,
        },
        {
            title: <Flex justify="center">Actions</Flex>,
            key: "actions",
            width: "10%",
            render: (category: any) => (
                <Flex justify="center">
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        onClick={() => navigate(`/staff/category/update/${category.id}`)}
                    />
                </Flex>
            ),
        },
    ];

    const fetchDataSource = async () => {
        try {
            const categories = await CategoryService.list();
            setDataSource(categories);
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

export default CategoryTable;
