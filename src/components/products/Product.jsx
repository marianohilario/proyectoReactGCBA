import { useState } from "react";
import styles from "./products.module.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

const Product = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCartContext();

  const manejarCambioCantidad = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    const valor = Number(evento.target.value);
    const maximo = product.stock || 1;
    setCantidad(Math.min(Math.max(valor, 1), maximo));
  };

  const manejarAgregarAlCarrito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    addToCart(product, cantidad);
  };

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
          <label
            htmlFor={`cantidad-${product.id}`}
            className={styles.quantityLabel}
          >
            Cantidad
          </label>
          <input
            id={`cantidad-${product.id}`}
            type="number"
            min="1"
            max={product.stock}
            value={cantidad}
            onChange={manejarCambioCantidad}
            className={styles.quantityInput}
          />
        </div>

        <button
          type="button"
          className={styles.buyBtn}
          onClick={manejarAgregarAlCarrito}
        >
          Agregar
        </button>
      </div>
    </Link>
  );
};

export default Product;
