import { useEffect, useState } from "react";
import { Button, Drawer } from "antd";

const ViewBooks = (props) => {
    const { viewBooksOpen, setViewBooksOpen, viewDataBooks } = props;

    const showDrawer = () => {
        setViewBooksOpen(true);
    };
    const onClose = () => {
        setViewBooksOpen(false);
    };
    console.log(viewDataBooks.category);
    return (
        <>
            <Drawer
                title="Xem chi tiết sách"
                onClose={() => {
                    onClose();
                }}
                set
                open={viewBooksOpen}
            >
                <p>Id : {viewDataBooks._id}</p>
                <br />
                <p>Tiêu đề: {viewDataBooks.mainText}</p>
                <br />
                <p>Tác giả: {viewDataBooks.author}</p>
                <br />
                <p>Thể loại: {viewDataBooks.category}</p>
                <br />
                <p>Giá tiền: {viewDataBooks.price}</p>
                <br />
                <p>Số lượng: {viewDataBooks.quantity}</p>
                <br />
                <p>Đã bán: {viewDataBooks.sold}</p>
                <br />
                <p>Thumbnail: </p>
                <img
                    style={{ width: "60%", marginTop: "20px" }}
                    src={`http://localhost:8080/images/book/${viewDataBooks.thumbnail}`}
                    alt="book thumbnail"
                />
            </Drawer>
        </>
    );
};

export default ViewBooks;
