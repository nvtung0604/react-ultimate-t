import { createContext, useState } from "react";

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
    });

    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        // tất cả thằng con đều có quyền truy cập biến này
        <AuthContext.Provider
            value={{ user, setUser, isAppLoading, setIsAppLoading }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
