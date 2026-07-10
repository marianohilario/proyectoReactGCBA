import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `${styles.navLink} ${pathname === path ? styles.active : ""}`;

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>MH Ecommerce</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={linkClass("/")}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={linkClass("/productos")}>
            <Link to="/productos">Productos</Link>
          </li>
          <li className={linkClass("/nuevo-producto")}>
            <Link to="/nuevo-producto">Nuevo Producto</Link>
          </li>
          <li className={linkClass("/nosotros")}>
            <Link to="/nosotros">Nosotros</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
