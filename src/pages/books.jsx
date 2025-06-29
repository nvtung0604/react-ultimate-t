import { useEffect, useState } from "react";
import BooksTable from "../components/books/books-table";
import { getAllBooksAPI } from "../services/api-service";
import { notification } from "antd";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadDataBooks();
    }, [current, pageSize]);
    const loadDataBooks = async () => {
        const result = await getAllBooksAPI(current, pageSize);
        let count = 0;
        if (result.data.result) {
            count++;
            if (count === 1) {
                notification.success({
                    message: "Load books!",
                    description: "Tải dữ liệu books thành công!",
                });
            }

            setDataBooks(result.data.result);
            setCurrent(result.data.meta.current);
            setPageSize(result.data.meta.pageSize);
            setTotal(result.data.meta.total);
        }
    };
    return (
        <>
            <BooksTable
                dataBooks={dataBooks}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                current={current}
                pageSize={pageSize}
                total={total}
            />
        </>
    );
};
export default BookPage;
