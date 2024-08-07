import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, message, Spin, Table, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { PromotionService } from "../../../Services";

const PromotionTable: React.FC<any> = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const columns = [
        {
            title: <Flex justify="center">ID</Flex>,
            key: "id",
            width: "10%",
            render: (promotion: any) => <Flex justify="center">{promotion.id}</Flex>,
        },
        {
            title: <Flex justify="center">Name</Flex>,
            key: "name",
            width: "30%",
            render: (promotion: any) => <Flex justify="center">{promotion.name}</Flex>,
        },
        {
            title: <Flex justify="center">Description</Flex>,
            key: "description",
            width: "40%",
            render: (promotion: any) => <Flex justify="center">{promotion.description}</Flex>,
        },
        {
            title: <Flex justify="center">Actions</Flex>,
            key: "actions",
            width: "20%",
            render: (promotion: any) => (
                <Flex justify="center">
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        onClick={() => navigate(`/staff/promotion/update/${promotion.id}`)}
                    />
                </Flex>
            ),
        },
    ];

    const fetchDataSource = async () => {
        try {
            const promotions = await PromotionService.list();
            setDataSource(promotions);
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

export default PromotionTable;
