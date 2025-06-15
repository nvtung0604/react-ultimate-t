import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
    return (
        <ul>
            <li>
                <Link class="active" to="#home">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/users">Users</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    );
};
export default Header;
