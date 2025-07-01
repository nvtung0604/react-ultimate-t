import { useEffect, useState } from "react";
import BooksTable from "../components/books/books-table";
import { getAllBooksAPI } from "../services/api-service";
import { notification } from "antd";
import ViewBooks from "../components/books/view-books";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [viewBooksOpen, setViewBooksOpen] = useState(false);
    const [viewDataBooks, setViewDataBooks] = useState([]);
    useEffect(() => {
        loadDataBooks();
    }, [current, pageSize]);

    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const loadDataBooks = async () => {
        const result = await getAllBooksAPI(current, pageSize);
        if (result.data.result) {
            if (!hasLoadedOnce) {
                notification.success({
                    message: "Load books!",
                    description: "Tải dữ liệu books thành công!",
                });
                setHasLoadedOnce(true);
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
                setViewBooksOpen={setViewBooksOpen}
                setViewDataBooks={setViewDataBooks}
                loadDataBooks={loadDataBooks}
            />
            <ViewBooks
                viewBooksOpen={viewBooksOpen}
                setViewBooksOpen={setViewBooksOpen}
                viewDataBooks={viewDataBooks}
            />
        </>
    );
};
export default BookPage;
