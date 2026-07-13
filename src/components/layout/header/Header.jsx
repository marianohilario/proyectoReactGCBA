import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import CartIcon from "../../cart/CartIcon";
import User from "../../user/User";
import styles from "./header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  console.log("Header user:", user);

  return (
    <header className={styles.header}>
      <CartIcon />
      {user ? (
        <User />
      ) : (
        <Link to="/login" className={styles.loginLink}>
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
