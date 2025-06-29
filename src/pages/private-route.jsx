import { useContext } from "react";
import { AuthContext } from "../components/context/auth-context";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return <>{props.children}</>;
    }
    // return <Navigate to="/login" replace />;
    return (
        <>
            <Result
                status="402"
                title="Unauthorize!"
                subTitle={"You need login to access resource"}
                extra={
                    <Button type="primary">
                        <Link to="/">Back Home page</Link>
                    </Button>
                }
            />
        </>
    );
};

export default PrivateRoute;
