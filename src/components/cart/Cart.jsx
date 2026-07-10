import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartContext";
import QuantityStepper from "../quantityStepper/QuantityStepper";
import { formatearPrecio } from "../../utils/formatearPrecio";
import styles from "./cart.module.css";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCartContext();

  const manejarVaciarCarrito = () => {
    clearCart();
    toast.info("Carrito vaciado");
  };

  const manejarEliminarProducto = (productId) => {
    removeFromCart(productId);
    toast.info("Producto eliminado del carrito");
  };

  const manejarFinalizarCompra = () => {
    toast.success("¡Gracias por tu compra!");
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
        <button
          className={styles.clearBtn}
          type="button"
          style={{ width: "fit-content" }}
          onClick={manejarVaciarCarrito}
        >
          Vaciar carrito
        </button>
        {cartItems.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            <Link
              to={`/producto/${item.product.id}`}
              className={styles.itemLink}
            >
              <img
                src={item.product.imagen}
                alt={item.product.nombre}
                className={styles.itemImage}
              />
            </Link>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.product.nombre}</h3>
              <div className={styles.itemQuantityRow}>
                <span className={styles.itemQuantityLabel}>Cantidad</span>
                <QuantityStepper
                  value={item.quantity}
                  min={1}
                  max={item.product.stock}
                  onChange={(nuevaCantidad) =>
                    updateQuantity(item.product.id, nuevaCantidad)
                  }
                />
              </div>
              <p className={styles.itemSubtotal}>
                Subtotal: $
                {formatearPrecio(item.product.precio * item.quantity)}
              </p>
            </div>
            <button
              className={styles.removeBtn}
              onClick={() => manejarEliminarProducto(item.product.id)}
              aria-label={`Quitar ${item.product.nombre} del carrito`}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <p className={styles.totalPrice}>
          Total: ${formatearPrecio(getTotalPrice())}
        </p>
        <Link
          to="/"
          onClick={manejarFinalizarCompra}
          className={styles.clearBtn}
        >
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
};

export default Cart;
