import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import SocialNetworks from "../../socialNetworks/SocialNetworks";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const linkClass = (path) =>
    `${styles.navLink} ${pathname === path ? styles.active : ""}`;

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>
        <span className={"title"} style={{ fontSize: "1.3rem" }}>
          MH Ecommerce
        </span>
      </h1>
      <nav>
        <ul className={styles.navList}>
          <li className={linkClass("/")}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={linkClass("/productos")}>
            <Link to="/productos">Productos</Link>
          </li>
          {user && user.rol === "admin" && (
            <li className={linkClass("/nuevo-producto")}>
              <Link to="/nuevo-producto">Gestión Productos</Link>
            </li>
          )}
          <li className={linkClass("/nosotros")}>
            <Link to="/nosotros">Nosotros</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.sidebarFooter}>
        <SocialNetworks />
      </div>
    </aside>
  );
};

export default Sidebar;
