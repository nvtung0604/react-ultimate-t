import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../../services/api-service";
import { use, useEffect, useState } from "react";

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);
    // empty array => just run one
    useEffect(() => {
        loadUser();
    }, []);
    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "FullName",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];

    const loadUser = async () => {
        try {
            const res = await fetchAllUserAPI();
            console.log("Kết quả API:", res); // 👈 Kiểm tra

            // Kiểm tra dữ liệu trả về là mảng không
            if (Array.isArray(res.data)) {
                setDataUsers(res.data);
            } else {
                console.error("❌ Dữ liệu không phải mảng:", res.data);
                setDataUsers([]); // fallback để tránh Table lỗi
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setDataUsers([]); // fallback
        }
    };

    return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};

export default UserTable;
