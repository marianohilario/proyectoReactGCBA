import Navbar from "../navbar/Navbar";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Mi Ecommerce</h1>
      <Navbar />
    </header>
  );
};

export default Header;
