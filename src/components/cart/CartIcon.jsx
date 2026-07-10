import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import styles from "./cartIcon.module.css";

const CartIcon = () => {
  const { getTotalItems } = useCartContext();
  const totalItems = getTotalItems();

  return (
    <Link to="/carrito" className={styles.cartIcon} aria-label="Ver carrito">
      <i className="bi bi-cart3"></i>
      {totalItems > 0 && (
        <span className={styles.badge}>
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
