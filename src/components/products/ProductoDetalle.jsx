import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import styles from "./products.module.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const encontrado = data.productos.find(
          (item) => item.id === Number(id),
        );
        setProducto(encontrado ?? null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader height="100px" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className={styles.container}>
        <h2 className={"title"}>Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.detalleCard}>
        <div className={styles.detalleImageContainer}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={styles.detalleImage}
          />
        </div>

        <div className={styles.detalleInfo}>
          <h2 className={styles.detalleNombre}>{producto.nombre}</h2>

          <div className={styles.priceRow}>
            <span className={styles.priceCurrency}>$</span>
            <span className={styles.priceAmount}>
              {producto.precio.toFixed(2)}
            </span>
          </div>

          <p className={styles.detalleStock}>
            Stock disponible: {producto.stock}
          </p>

          <button className={styles.buyBtn}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
