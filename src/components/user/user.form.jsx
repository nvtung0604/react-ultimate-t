import { Divider, Flex, notification, Modal } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api-service";
const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSubmitBtn = async () => {
        setIsModalOpen(true);
        const res = await createUserAPI(fullName, email, password, phone);

        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công",
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message),
            });
        }
    };
    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    };
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h3>Table Users</h3>
                    <Button
                        onClick={() => {
                            handleSubmitBtn(() => setIsModalOpen(true));
                        }}
                        type="primary"
                    >
                        Create User
                    </Button>
                </div>
            </div>
            <Modal
                title="Create Users"
                open={isModalOpen}
                onOk={() => {
                    handleSubmitBtn();
                }}
                onCancel={() => {
                    resetAndCloseModal();
                }}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div className="user-form" style={{ margin: "20px 0" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            flexDirection: "column",
                        }}
                    >
                        <div>
                            <span>FullName</span>
                            <Input
                                value={fullName}
                                onChange={(event) => {
                                    setFullName(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <span>Email</span>
                            <Input
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <span>Phone number</span>
                            <Input
                                value={phone}
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        ></div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default UserForm;
