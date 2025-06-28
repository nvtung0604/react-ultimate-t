import { Link, NavLink } from "react-router-dom";
import {
    UsergroupAddOutlined,
    HomeOutlined,
    BookOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { AuthContext } from "../context/auth-context";
const Header = () => {
    const [current, setCurrent] = useState("mail");

    const { user } = useContext(AuthContext);

    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>User</Link>,
            key: "users",
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },
        {
            label: <Link to={"/books"}>Cài đặt</Link>,
            icon: <SettingOutlined />,
            children: [
                {
                    type: "group",
                    children: [
                        {
                            label: <Link to={"/login"}>Đăng nhập</Link>,
                        },
                        { label: "Đăng xuất" },
                    ],
                },
            ],
        },
    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};
export default Header;
