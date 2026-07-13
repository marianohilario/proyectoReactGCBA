import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import SocialNetworks from "../../socialNetworks/SocialNetworks";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const linkClass = (path) =>
    `${styles.navLink} ${pathname === path ? styles.active : ""}`;

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <h1 className={styles.brand}>
          <span className={"title"} style={{ fontSize: "1.3rem" }}>
            MH Ecommerce
          </span>
        </h1>
        <nav>
          <ul className={styles.navList}>
            <li className={linkClass("/")}>
              <Link to="/" onClick={onClose}>
                Inicio
              </Link>
            </li>
            <li className={linkClass("/productos")}>
              <Link to="/productos" onClick={onClose}>
                Productos
              </Link>
            </li>
            {user && user.rol === "admin" && (
              <li className={linkClass("/gestion-productos")}>
                <Link to="/gestion-productos" onClick={onClose}>
                  Gestión Productos
                </Link>
              </li>
            )}
            <li className={linkClass("/nosotros")}>
              <Link to="/nosotros" onClick={onClose}>
                Nosotros
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.sidebarFooter}>
          <SocialNetworks />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
