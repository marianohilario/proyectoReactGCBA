import CartIcon from "../../cart/CartIcon";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <CartIcon />
    </header>
  );
};

export default Header;
