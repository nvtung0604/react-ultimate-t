import { Drawer, Button, notification } from "antd";
import { useState } from "react";
import {
    handleUploadFile,
    updateUserAvatarAPI,
} from "../../services/api-service";
const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser,
    } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const handleOnChangesFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar,
                dataDetail._id,
                dataDetail.fullName,
                dataDetail.phone
            );
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công",
                });
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message),
                });
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
            return;
        }
        //step 2" update user
    };
    return (
        <>
            <Drawer
                width={"40vw"}
                title="Chit tiết User"
                closable={{ "aria-label": "Close Button" }}
                onClose={() => {
                    setDataDetail(null);
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataDetail ? (
                    <>
                        <p>Id: {dataDetail._id}</p>
                        <br />
                        <p>Full name: {dataDetail.fullName}</p>
                        <br />
                        <p>Phone number: {dataDetail.phone}</p>
                        <br />
                        <div>
                            <p>Avatar: </p>
                            <div
                                style={{
                                    marginTop: "10px",
                                    height: "100px",
                                    width: "150px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                    src={`http://localhost:8080/images/avatar/${dataDetail.avatar}`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <label
                                style={{
                                    cursor: "pointer",
                                    background: "green",
                                    padding: "7px",
                                    borderRadius: "4px",
                                    color: "#fff",
                                }}
                                htmlFor="btnInputFile"
                            >
                                Upload Avatar
                            </label>
                            <input
                                type="file"
                                name=""
                                id="btnInputFile"
                                hidden
                                onChange={(event) => {
                                    handleOnChangesFile(event);
                                }}
                            />
                        </div>
                        {preview && (
                            <div style={{ marginTop: "20px" }}>
                                <p>Preview: </p>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        height: "100px",
                                        width: "150px",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                        src={preview}
                                        alt=""
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => handleUpdateUserAvatar()}
                                >
                                    SAVE
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                )}
            </Drawer>
        </>
    );
};
export default ViewUserDetail;
