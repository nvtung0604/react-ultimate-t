import { Input, Modal, notification, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBooksAPI } from "../../services/api-service";

const UpdateBooks = (props) => {
    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataDetail,
        setDataDetail,
        loadDataBooks,
    } = props;
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");
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

    const handleUpdateBooks = async () => {
        let thumbnailValue = img; // mặc định dùng ảnh cũ

        if (selectedFile) {
            const newThumbnail = await handleUploadFile(selectedFile, "book");
            thumbnailValue = newThumbnail?.data?.fileUploaded || img;
        }

        const res = await updateBooksAPI(
            id,
            thumbnailValue,
            mainText,
            author,
            parseInt(price),
            parseInt(quantity),
            category
        );

        if (res.data) {
            notification.success({
                message: "Update book",
                description: "Cập nhật sách thành công",
            });

            setSelectedFile(null);
            setPreview(null);
            setIsModalUpdateOpen(false);
            setDataDetail(null);
            loadDataBooks();
        }
    };

    useEffect(() => {
        if (!dataDetail) {
            setId("");
            setMainText("");
            setAuthor("");
            setPrice("");
            setQuantity("");
            setCategory("");
            setImg("");
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        setId(dataDetail._id);
        const thumbnailValue =
            typeof dataDetail.thumbnail === "object" &&
            dataDetail.thumbnail !== null
                ? dataDetail.thumbnail.fileUploaded
                : dataDetail.thumbnail;
        setImg(thumbnailValue);
        setMainText(dataDetail.mainText);
        setAuthor(dataDetail.author);
        setPrice(dataDetail.price);
        setQuantity(dataDetail.quantity);
        setCategory(dataDetail.category);
        setSelectedFile(null);
        setPreview(null);
    }, [dataDetail]);
    return (
        <>
            <Modal
                title="Update Book"
                open={isModalUpdateOpen}
                onOk={async () => {
                    await handleUpdateBooks(); // gọi upload và tạo sách
                }}
                onCancel={() => {
                    setIsModalUpdateOpen(false);
                    setDataDetail(null);

                    // resetDataBooks();
                }}
                maskClosable={false}
                okText={"UPDATE"}
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

                            {
                                <Select
                                    style={{ width: "100%" }}
                                    value={category}
                                    onChange={(value) => setCategory(value)}
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
                            }
                        </div>
                        {
                            <div style={{ marginTop: "10px" }}>
                                <img
                                    style={{
                                        width: "150px",
                                        height: "100px",
                                        objectFit: "contain",
                                        border: "1px solid #ccc",
                                    }}
                                    src={
                                        preview
                                            ? preview
                                            : `http://localhost:8080/images/book/${img}`
                                    }
                                    alt="thumbnail"
                                />
                            </div>
                        }
                        <div style={{ marginTop: "20px" }}>
                            <label
                                style={{
                                    cursor: "pointer",
                                    background: "green",
                                    padding: "7px",
                                    borderRadius: "4px",
                                    color: "#fff",
                                }}
                                htmlFor="btnInputFiles"
                            >
                                Upload Books
                            </label>
                            <input
                                type="file"
                                name=""
                                id="btnInputFiles"
                                hidden
                                onChange={(event) => {
                                    handleOnChangesFile(event);
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
        </>
    );
};
export default UpdateBooks;
