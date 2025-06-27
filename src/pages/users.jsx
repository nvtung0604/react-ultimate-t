import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { use, useEffect, useState } from "react";
import { fetchAllUserAPI } from "../services/api-service";

const UsersPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    // empty array => just run one
    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <div>
                <UserForm loadUser={loadUser} />
                <UserTable
                    dataUsers={dataUsers}
                    loadUser={loadUser}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    );
};
export default UsersPage;
