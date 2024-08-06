import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Flex, Layout, Menu, theme, MenuProps } from "antd";
import {
    ProductOutlined,
    ShoppingCartOutlined,
    TagOutlined,
} from "@ant-design/icons";
import path from "path";

const { Sider } = Layout;

const menuStyle = {
    marginTop: "60px",
    minHeight: "calc(100vh)",
};

const menuItems = [
    {
        key: "category",
        icon: <ProductOutlined />,
        title: "Category",
        label: <Link to="/staff/category">Category</Link>,
    },
    {
        key: "product",
        icon: <ShoppingCartOutlined />,
        title: "Product",
        label: <Link to="/staff/product">Product</Link>,
    },
    {
        key: "discount",
        icon: <TagOutlined />,
        title: "Promotion",
        label: <Link to="/staff/promotion">Promotion</Link>,
    },
]

const MenuSider: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={220}
            style={{
                background: colorBgContainer,
            }}
        >
            <Menu
                theme="light"
                style={menuStyle}
                mode="inline"
                defaultSelectedKeys={["files-upload"]}
                selectedKeys={[
                    `${window.location.pathname.split("/")[1]}-${window.location.pathname.split("/")[2]
                    }`,
                ]}
                items={menuItems}
            />
        </Sider>
    );
};

export default MenuSider;
