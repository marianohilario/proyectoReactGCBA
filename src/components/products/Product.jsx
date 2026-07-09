import { useState } from "react";
import styles from "./products.module.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

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
          onClick={() => setIsFavorite(!isFavorite)}
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

        <button type="button" className={styles.buyBtn}>
          Comprar
        </button>
      </div>
    </Link>
  );
};

export default Product;
