import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
const Navbar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `${styles.navLinks} ${pathname === path ? styles.active : ""}`;

  return (
    <nav>
      <ul className={styles.navbar}>
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
  );
};

export default Navbar;
