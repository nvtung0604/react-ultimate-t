import { Button, Input, Form, notification } from "antd";
import { registerUserAPI } from "../services/api-service";
import { useNavigate } from "react-router-dom";
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
                // onFinishFailed={onFinishFailed}
            >
                <div
                    action=""
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
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

                    <div>
                        <Button
                            style={{ width: "100px", marginTop: "10px" }}
                            type="primary"
                            onClick={() => form.submit()}
                        >
                            Register
                        </Button>
                        <Button
                            onClick={() => {
                                form.setFieldValue({
                                    email: "hoidanit",
                                });
                            }}
                        >
                            Test
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
};
export default RegisterPage;
