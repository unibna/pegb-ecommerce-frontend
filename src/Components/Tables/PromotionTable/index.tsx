import React, { useEffect, useState } from "react";

import { Flex, message, Spin, Table } from "antd";
import { PromotionService } from "../../../Services";


const PromotionTable: React.FC<any> = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
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
            width: "60%",
            render: (category: any) => <Flex justify="center">{category.description}</Flex>,
        },
    ]

    const fetchDataSource = async () => {
        try {
            const promotions = await PromotionService.list();
            setDataSource(promotions);
        } catch (error) {
            message.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading) {
            fetchDataSource();
        }
    }, [loading]);

    if (loading) {
        return <Spin />;
    }

    return <Table columns={columns} dataSource={dataSource} />;
}

export default PromotionTable;
