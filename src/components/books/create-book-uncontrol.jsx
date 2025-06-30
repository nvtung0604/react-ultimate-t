import { Button, Input, Form, notification, Modal, Select } from "antd";
import { createBooksAPI, handleUploadFile } from "../../services/api-service";
import { useState } from "react";

const CreateBookUnControll = (props) => {
    const { loadDataBooks } = props;
    const [viewUnControlBook, setViewUnControllBook] = useState(false);
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const reset = () => {
        setViewUnControllBook(false);
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
    };
    const handleOnChangeFileBook = (event) => {
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
    console.log(selectedFile);
    const onFinish = async (values) => {
        let thumbnail = "";
        if (selectedFile) {
            const uploadRes = await handleUploadFile(selectedFile, "book");
            if (uploadRes.data) {
                thumbnail = uploadRes.data.fileUploaded;
            }
        }

        const payload = {
            mainText: values.mainText,
            author: values.author,
            price: parseInt(values.price),
            quantity: parseInt(values.quantity),
            category: values.category,
            thumbnail: thumbnail,
        };

        try {
            const res = await createBooksAPI(
                payload.mainText,
                payload.author,
                payload.price,
                payload.quantity,
                payload.category,
                payload.thumbnail
            );

            if (res.data) {
                notification.success({
                    message: "Thành công",
                    description: "Tạo sách thành công!",
                });
                reset();
                loadDataBooks();
            }
        } catch (error) {
            console.error("❌ Lỗi tạo sách:", error);
            notification.error({
                message: "Thất bại",
                description:
                    error.response?.data?.message ||
                    "Dữ liệu không hợp lệ hoặc server từ chối!",
            });
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <h3>Table Books UnControl</h3>
                <Button
                    type="primary"
                    onClick={() => {
                        setViewUnControllBook(true);
                        form.resetFields();
                    }}
                >
                    Create Book Uncontrol
                </Button>
            </div>

            <Modal
                title=" Create Book UnControl"
                open={viewUnControlBook}
                onCancel={() => reset()}
                footer={null}
                maskClosable={false}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="register-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tiêu đề!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tác giả!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá tiền!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                pattern: /^[0-9]+$/,
                                message: "Vui lòng nhập số hợp lệ!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn thể loại!",
                            },
                        ]}
                    >
                        <Select style={{ width: "100%" }}>
                            <Select.Option value="Arts">Arts</Select.Option>
                            <Select.Option value="Business">
                                Business
                            </Select.Option>
                            <Select.Option value="Comics">Comics</Select.Option>
                            <Select.Option value="Cooking">
                                Cooking
                            </Select.Option>
                            <Select.Option value="Entertainment">
                                Entertainment
                            </Select.Option>
                            <Select.Option value="History">
                                History
                            </Select.Option>
                            <Select.Option value="Music">Music</Select.Option>
                            <Select.Option value="Sports">Sports</Select.Option>
                            <Select.Option value="Teen">Teen</Select.Option>
                            <Select.Option value="Travel">Travel</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div>
                            <label style={{ fontWeight: "bold" }}>
                                Upload Books
                            </label>
                            <br />
                            <label
                                htmlFor="btnInputFile"
                                style={{
                                    cursor: "pointer",
                                    background: "green",
                                    padding: "7px",
                                    borderRadius: "4px",
                                    color: "#fff",
                                    display: "inline-block",
                                    marginTop: 8,
                                }}
                            >
                                Chọn ảnh bìa sách
                            </label>
                            <input
                                type="file"
                                id="btnInputFile"
                                onChange={handleOnChangeFileBook}
                                style={{ display: "none" }}
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{ marginTop: 10, maxWidth: "100%" }}
                                />
                            )}
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    reset();
                                }}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ flex: 1 }}
                            >
                                Create
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateBookUnControll;
