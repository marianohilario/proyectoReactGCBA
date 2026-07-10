import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import styles from "./cart.module.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCartContext();

  const manejarCambioCantidad = (evento, item) => {
    const valor = Number(evento.target.value);
    const maximo = item.product.stock || 1;
    updateQuantity(item.product.id, Math.min(Math.max(valor, 1), maximo));
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={"title"}>Carrito de Compras</h2>
        <p className={styles.emptyMessage}>
          Todavía no agregaste productos al carrito.
        </p>
        <Link to="/productos" className={styles.continueLink}>
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={"title"}>Carrito de Compras</h2>

      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            <img
              src={item.product.imagen}
              alt={item.product.nombre}
              className={styles.itemImage}
            />
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.product.nombre}</h3>
              <div className={styles.itemQuantityRow}>
                <label
                  htmlFor={`cantidad-${item.product.id}`}
                  className={styles.itemQuantityLabel}
                >
                  Cantidad
                </label>
                <input
                  id={`cantidad-${item.product.id}`}
                  type="number"
                  min="1"
                  max={item.product.stock}
                  value={item.quantity}
                  onChange={(evento) => manejarCambioCantidad(evento, item)}
                  className={styles.itemQuantityInput}
                />
              </div>
              <p className={styles.itemSubtotal}>
                Subtotal: ${(item.product.precio * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(item.product.id)}
              aria-label={`Quitar ${item.product.nombre} del carrito`}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <p className={styles.totalPrice}>
          Total: ${getTotalPrice().toFixed(2)}
        </p>
        <button className={styles.clearBtn} onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;
