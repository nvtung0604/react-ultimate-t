import { Button, Input, Form, notification, Row, Col } from "antd";
import { registerUserAPI } from "../services/api-service";
import { useNavigate, Link } from "react-router-dom";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerUserAPI(
            values.fullname,
            values.email,
            values.password,
            values.phone
        );
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công!",
            });
            navigate("/lgoin");
        } else {
            notification.error({
                message: "Register user",
                description: JSON.stringify(res.message),
            });
        }
    };
    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={onFinish}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    marginTop: "20px",
                }}

                // onFinishFailed={onFinishFailed}
            >
                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col>
                        <div>
                            <Button
                                style={{
                                    width: "100px",
                                    marginTop: "10px",
                                }}
                                type="primary"
                                onClick={() => form.submit()}
                            >
                                Register
                            </Button>
                            <Button onClick={() => {}}>Test</Button>
                        </div>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <div
                            style={{
                                borderTop: "1px solid #000",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                columnGap: "5px",
                                fontSize: "16px",
                                paddingTop: "20px",
                                marginTop: "20px",
                            }}
                        >
                            <span>Đã có tài khoản??</span>
                            <Link to={"/login"}>Đăng nhập tại đây</Link>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default RegisterPage;
