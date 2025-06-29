import { Link, NavLink } from "react-router-dom";
import {
    UsergroupAddOutlined,
    HomeOutlined,
    BookOutlined,
    LoginOutlined,
    AliwangwangOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState, useContext } from "react";
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
        ...(!user.id
            ? [
                  {
                      label: <Link to={"/login"}>Đăng nhập</Link>,
                      icon: <LoginOutlined />,
                  },
              ]
            : []),

        ...(user.id
            ? [
                  {
                      label: `Welcome ${user.fullName}`,
                      key: "login",
                      icon: <AliwangwangOutlined />,
                      children: [
                          {
                              label: <Link to={"/login"}>Đăng xuất</Link>,
                              key: "logout",
                          },
                      ],
                  },
              ]
            : []),
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
