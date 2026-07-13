import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import CartIcon from "../../cart/CartIcon";
import User from "../../user/User";
import styles from "./header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <CartIcon />
      {user ? (
        <User />
      ) : (
        <div className={styles.authLinks}>
          <Link
            to="/register"
            className={`${styles.authLink} ${activeRoute === "/register" ? styles.active : ""}`}
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className={`${styles.authLink} ${activeRoute === "/login" ? styles.active : ""}`}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
