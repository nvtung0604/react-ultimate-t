import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { use, useEffect, useState } from "react";
import { fetchAllUserAPI } from "../services/api-service";

const UsersPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    // empty array => just run one
    useEffect(() => {
        loadUser();
    }, []);

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
    return (
        <div style={{ padding: "20px" }}>
            <div>
                <UserForm loadUser={loadUser} />
                <UserTable dataUsers={dataUsers} />
            </div>
        </div>
    );
};
export default UsersPage;
