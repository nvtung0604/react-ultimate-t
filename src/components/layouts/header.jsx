import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    UsergroupAddOutlined,
    HomeOutlined,
    BookOutlined,
    LoginOutlined,
    AliwangwangOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { fetchAllUserAPI, logOutAPI } from "../../services/api-service";
const Header = () => {
    const [current, setCurrent] = useState("mail");

    const { user, setUser, setIsLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key == "logout") {
            handleLogOut();
        }
    };

    const handleLogOut = async () => {
        const res = await logOutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            });
            message.success("Logout success!");
            // redirect to home
            navigate("/");
        }
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
                              label: <span>Đăng xuất</span>,
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
