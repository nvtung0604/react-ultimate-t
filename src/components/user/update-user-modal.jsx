import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from "../../services/api-service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadUser,
    } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id || "");
            setFullName(dataUpdate.fullName || "");
            setPhone(dataUpdate.phone || "");
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res?.data) {
            notification.success({
                message: "Update user",
                description: "Cập nhật user thành công",
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res?.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhone("");
        setId("");
        setDataUpdate("");
    };

    return (
        <Modal
            title="Update Users"
            open={isModalUpdateOpen}
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText="SAVE"
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
                        <span>Id</span>
                        <Input value={id} disabled={true} />
                    </div>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;
