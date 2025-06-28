import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Checkbox,
    Form,
    Input,
    notification,
    Row,
    Col,
    message,
} from "antd";
import { Link, NavLink } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { loginAPI } from "../services/api-service";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        // gọi API tốn thời gian => bất đồng bộ dùng async await
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            navigate("/");
        } else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message),
            });
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Form
                style={{
                    position: "relative",

                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "32px 24px",
                    backgroundColor: "#fafafa",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "500px",
                }}
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email is required",
                        },
                        { type: "email", message: "Email is invalid" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            // pattern: new RegExp(
                            //     "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$"
                            // ),
                            message: "Wrong format",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            style={{ width: "90px" }}
                        >
                            Login
                        </Button>
                        <Link to="/" style={{ marginLeft: "16px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    columnGap: "5px",
                                }}
                            >
                                Go to home page <ArrowRightOutlined />
                            </div>
                        </Link>
                    </div>
                </Form.Item>

                <div
                    style={{
                        borderTop: "1px solid #000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: "5px",
                        fontSize: "16px",
                        paddingTop: "20px",
                    }}
                >
                    <span>Chưa có tài khoản?</span>
                    <Link to={"/register"}>Đăng kí tại đây</Link>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "-10px",
                        left: "10px",
                        padding: "5px",
                        background: "#fafafa",
                        borderRadius: "5px",
                    }}
                >
                    Đăng ký
                </div>
            </Form>
        </div>
    );
};
export default LoginPage;
