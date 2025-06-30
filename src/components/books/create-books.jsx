import { Button, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBooksAPI, handleUploadFile } from "../../services/api-service";

const CreatBooks = (props) => {
    const { loadDataBooks } = props;
    const [mainText, setMainText] = useState("");

    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const { Option } = Select;
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
    // console.log(preview);
    // console.log(selectedFile);
    const handleChoiceThumbnailBook = async () => {
        const res = await handleUploadFile(selectedFile, "book");
        if (res.data) {
            const thumbnail = res.data.fileUploaded;
            if (
                !mainText ||
                !author ||
                !price ||
                !quantity ||
                !category ||
                !selectedFile
            ) {
                notification.error({
                    message: "Thiếu thông tin",
                    description:
                        "Vui lòng điền đầy đủ thông tin và chọn ảnh sách!",
                });
                return;
            }

            const postBook = await createBooksAPI(
                mainText,
                author,
                parseInt(price),
                parseInt(quantity),
                category,
                thumbnail
            );
            console.log(postBook);
            if (postBook.data) {
                setIsModalOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadDataBooks();
                notification.success({
                    message: "Create book",
                    description: "Thêm sách thành công!",
                });
            }
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmitBtn = () => {
        setIsModalOpen(true);
        // resetDataBooks();
    };
    const resetDataBooks = () => {
        setIsModalOpen(false);
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
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
                    <h3>Table Books</h3>
                    <Button
                        onClick={() => {
                            handleSubmitBtn(() => setIsModalOpen(true));
                        }}
                        type="primary"
                    >
                        Create Book
                    </Button>
                </div>
            </div>
            <Modal
                title="Create Book"
                open={isModalOpen}
                onOk={async () => {
                    await handleChoiceThumbnailBook(); // gọi upload và tạo sách
                    resetDataBooks(); // reset và đóng modal sau khi thêm
                }}
                onCancel={() => {
                    resetDataBooks();
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
                            <span>Tiêu đề</span>
                            <Input
                                value={mainText}
                                onChange={(event) => {
                                    setMainText(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <span>Tác giả</span>
                            <Input
                                value={author}
                                onChange={(event) => {
                                    setAuthor(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <span>Giá tiền</span>
                            <Input
                                value={price}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                                addonAfter="đ"
                            />
                        </div>
                        <div>
                            <span>Số lượng</span>
                            <Input
                                value={quantity}
                                onChange={(event) => {
                                    setQuantity(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <span>Thể loại</span>
                            {/* <Input
                                value={category}
                                onChange={(event) => {
                                    setCategory(event.target.value);
                                }}
                            /> */}
                            <Select
                                style={{ width: "100%" }}
                                value={category}
                                onChange={(value) => setCategory(value)}
                                placeholder="Chọn thể loại"
                            >
                                <Option value="Arts">Arts</Option>
                                <Option value="Business">Business</Option>
                                <Option value="Comics">Comics</Option>
                                <Option value="Cooking">Cooking</Option>
                                <Option value="Entertainment">
                                    Entertainment
                                </Option>
                                <Option value="History">History</Option>
                                <Option value="Music">Music</Option>
                                <Option value="Sports">Sports</Option>
                                <Option value="Teen">Teen</Option>
                                <Option value="Travel">Travel</Option>
                            </Select>
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
                                Upload Books
                            </label>
                            <input
                                type="file"
                                name=""
                                id="btnInputFile"
                                hidden
                                onChange={(event) => {
                                    handleOnChangeFileBook(event);
                                }}
                            />
                        </div>

                        {preview && (
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
                                    alt="preview"
                                />
                            </div>
                        )}

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

export default CreatBooks;
