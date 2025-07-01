import { Button, Form, Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBooksAPI } from "../../services/api-service";

const UpdateBooksUncontrol = (props) => {
    const {
        uncontrolModalOpen,
        setUnControlModalOpen,
        loadDataBooks,
        dataDetail,
        setDataDetail,
    } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fillForm = () => {
        if (dataDetail) {
            form.setFieldsValue({
                id: dataDetail._id,
                mainText: dataDetail.mainText,
                author: dataDetail.author,
                price: dataDetail.price,
                quantity: dataDetail.quantity,
                category: dataDetail.category,
            });
        }
    };
    useEffect(() => {
        fillForm();
    }, [dataDetail]);
    const onReset = () => {
        form.resetFields();
        setDataDetail(null);
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
    const onFinish = async (values) => {
        let thumbnail = dataDetail?.thumbnail || "";
        if (selectedFile) {
            const newThumb = await handleUploadFile(selectedFile, "book");
            if (newThumb.data) {
                thumbnail = newThumb.data.fileUploaded;
            }
        }
        const res = await updateBooksAPI(
            values.id,
            thumbnail,
            values.mainText,
            values.author,
            parseInt(values.price),
            values.quantity,
            values.category
        );
        console.log("CHECK RES", res);
        if (res && res.data) {
            notification.success({
                message: "Update Book",
                description: "Cập nhật thành công!",
            });
            loadDataBooks();
            onReset();
            setUnControlModalOpen(false);
        }
    };
    return (
        <>
            <Modal
                title=" Update Book UnControl"
                open={uncontrolModalOpen}
                onCancel={() => {
                    setUnControlModalOpen(false);
                    onReset();
                }}
                afterOpenChange={(open) => {
                    if (open && dataDetail) fillForm();
                }}
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
                    <Form.Item label="Id" name="id">
                        <Input disabled={true} />
                    </Form.Item>
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
                        </div>
                    </Form.Item>
                    <input
                        type="file"
                        id="btnInputFile"
                        onChange={handleOnChangeFileBook}
                        style={{ display: "none" }}
                    />
                    {(preview || dataDetail?.thumbnail) && (
                        <img
                            style={{ width: "40%" }}
                            src={
                                preview
                                    ? preview
                                    : `http://localhost:8080/images/book/${dataDetail.thumbnail}`
                            }
                            alt=""
                        />
                    )}
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
                                    onReset();
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
                                Update
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateBooksUncontrol;
