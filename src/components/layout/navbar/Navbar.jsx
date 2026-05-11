import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navbar}>
        <li className={styles.navLinks}>Inicio</li>
        <li className={styles.navLinks}>Productos</li>
        <li className={styles.navLinks}>Contacto</li>
        <li className={styles.navLinks}>Carrito</li>
      </ul>
    </nav>
  );
};

export default Navbar;
