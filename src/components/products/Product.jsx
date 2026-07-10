import { useState } from "react";
import styles from "./products.module.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import QuantityStepper from "../quantityStepper/QuantityStepper";

const Product = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, getCantidadActual } = useCartContext();

  const itemEnCarrito = getCantidadActual(product.id);
  const [cantidad, setCantidad] = useState(
    itemEnCarrito ? Math.min(itemEnCarrito, product.stock || 1) : 1,
  );

  const manejarAgregarAlCarrito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    addToCart(product, cantidad);
  };

  if (product.id === 1)
    console.log(
      "product: ",
      product,
      "cantidad: ",
      cantidad,
      "itemEnCarrito: ",
      itemEnCarrito,
    );

  const disabled =
    product.stock === 0 ||
    cantidad > product.stock ||
    cantidad === itemEnCarrito;

  return (
    <Link to={`/producto/${product.id}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <div className={styles.imageOverlay} />
        <img
          src={product.imagen}
          alt={product.nombre}
          className={styles.productImage}
        />
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Quitar favorito" : "Agregar favorito"}
        >
          {isFavorite ? (
            <i className="bi bi-star-fill" style={{ color: "#FFD700" }} />
          ) : (
            <i className="bi bi-star" style={{ color: "#888" }} />
          )}
        </button>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.productName}>{product.nombre}</h3>

        <div className={styles.priceRow}>
          <span className={styles.priceCurrency}>$</span>
          <span className={styles.priceAmount}>
            {product.precio.toFixed(2)}
          </span>
        </div>

        <div
          className={styles.quantityRow}
          onClick={(evento) => {
            evento.preventDefault();
            evento.stopPropagation();
          }}
        >
          <span className={styles.quantityLabel}>Cantidad</span>
          <QuantityStepper
            value={cantidad}
            min={1}
            max={product.stock}
            onChange={setCantidad}
          />
        </div>

        <button
          type="button"
          className={styles.buyBtn + " " + (disabled ? styles.disabled : "")}
          onClick={manejarAgregarAlCarrito}
          aria-label={`Agregar ${cantidad} de ${product.nombre} al carrito`}
          disabled={disabled}
        >
          {itemEnCarrito > 0 ? "Modificar cantidad" : "Agregar al carrito"}
        </button>
      </div>
    </Link>
  );
};

export default Product;
