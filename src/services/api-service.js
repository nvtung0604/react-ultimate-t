import axios from "./axios-custom";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user";
    const data = { fullName, email, password, phone };
    return axios.post(URL_BACKEND, data); // ✅ sửa lỗi
};

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone,
    };
    return axios.put(URL_BACKEND, data);
};

const fetchAllUserAPI = () => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user";
    const data = {
        fullName: "fullName",
        email: "email",
        password: "password",
        phone: "phone",
    };
    return axios.get(URL_BACKEND, {
        params: data, // ✅ dùng params thay vì body
    });
};
const deleteUserAPI = (id) => {
    const URL_BACKEND = `http://localhost:8080/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
};

export { createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI };
