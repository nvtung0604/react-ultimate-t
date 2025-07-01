import { useEffect, useState } from "react";
import { notification, Popconfirm, Space, Table, Tag } from "antd";
import { deleteBookAPI, getAllBooksAPI } from "../../services/api-service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreatBooks from "./create-books";
import CreateBookUnControll from "./create-book-uncontrol";
import UpdateBooks from "./update-books";
import UpdateBooksUncontrol from "./update-book-uncontrol";

const BooksTable = (props) => {
    const {
        dataBooks,
        current,
        pageSize,
        setCurrent,
        setPageSize,
        total,
        setViewBooksOpen,
        setViewDataBooks,
        loadDataBooks,
    } = props;
    const handleDelete = async (id) => {
        const res = await deleteBookAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: "Xóa thành công",
            });
            loadDataBooks();
        }
    };
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [uncontrolModalOpen, setUnControlModalOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const columns = [
        {
            title: "STT",
            render: (_, record, index) => (
                <>{index + 1 + (current - 1) * pageSize}</>
            ),
        },
        {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            render: (_, record) => (
                <a
                    onClick={() => {
                        setViewDataBooks(record);
                        setViewBooksOpen(true);
                    }}
                >
                    {record._id}
                </a>
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "mainText",
            key: "mainText",
        },
        {
            title: "Giá tiền",
            key: "price",
            dataIndex: "price",
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "Tác giả",
            key: "author",
            dataIndex: "author",
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (_, record) => (
                <Space size="middle">
                    <div style={{ color: "orange" }}>
                        <EditOutlined
                            onClick={() => {
                                setUnControlModalOpen(true);
                                setDataDetail(record);
                            }}
                        />
                    </div>
                    <div style={{ color: "red" }}>
                        <Popconfirm
                            title="Xóa người dùng"
                            description="Bạn chắc chắn xóa user này?"
                            onConfirm={() => {
                                handleDelete(record._id);
                            }}
                            okText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <DeleteOutlined
                                style={{ cursor: "pointer", color: "red" }}
                            />
                        </Popconfirm>
                    </div>
                </Space>
            ),
        },
    ];
    const data = dataBooks.map((item) => {
        return {
            _id: item._id,
            mainText: item.mainText,
            price: item.price + " đ",
            quantity: item.quantity,
            author: item.author,
            category: item.category,
            sold: item.sold,
            thumbnail: item.thumbnail,
        };
    });

    const onChange = (pagination) => {
        if (pagination && pagination.current) {
            if (pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    return (
        <>
            <CreateBookUnControll loadDataBooks={loadDataBooks} />
            <CreatBooks loadDataBooks={loadDataBooks} />
            <Table
                columns={columns}
                dataSource={data}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
            />
            {/* <UpdateBooks
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadDataBooks={loadDataBooks}
            /> */}
            <UpdateBooksUncontrol
                uncontrolModalOpen={uncontrolModalOpen}
                setUnControlModalOpen={setUnControlModalOpen}
                loadDataBooks={loadDataBooks}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    );
};
export default BooksTable;
