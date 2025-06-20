import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../../services/api-service";
import { use, useState } from "react";

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([
        { _id: "tung", fullName: 25, email: "haiduong" },
    ]);
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
        const res = await fetchAllUserAPI;
        // setDataUsers(res.data);
    };
    loadUser();
    return <Table columns={columns} dataSource={dataUsers} />;
};

export default UserTable;
