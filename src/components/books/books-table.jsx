import { useEffect, useState } from "react";
import { notification, Space, Table, Tag } from "antd";
import { getAllBooksAPI } from "../../services/api-service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BooksTable = (props) => {
    const { dataBooks, current, pageSize, setCurrent, setPageSize, total } =
        props;
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
            render: (_, record) => <a>{record._id}</a>,
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
                        <EditOutlined />
                    </div>
                    <div style={{ color: "red" }}>
                        <DeleteOutlined />
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
            ;
        </>
    );
};
export default BooksTable;
