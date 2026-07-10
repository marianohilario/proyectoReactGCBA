import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import styles from "./products.module.css";
import { useCartContext } from "../../context/CartContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart, getCantidadActual } = useCartContext();

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

  useEffect(() => {
    if (!producto) return;
    const itemEnCarrito = getCantidadActual(producto.id);
    setCantidad(
      itemEnCarrito ? Math.min(itemEnCarrito, producto.stock || 1) : 1,
    );
  }, [producto]);

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

  const manejarCambioCantidad = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    const valor = Number(evento.target.value);
    const maximo = producto.stock || 1;
    setCantidad(Math.min(Math.max(valor, 1), maximo));
  };

  const manejarAgregarAlCarrito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    addToCart(producto, cantidad);
  };

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

          <div
            className={styles.quantityRow}
            onClick={(evento) => {
              evento.preventDefault();
              evento.stopPropagation();
            }}
          >
            <label
              htmlFor={`cantidad-${producto.id}`}
              className={styles.quantityLabel}
            >
              Cantidad
            </label>
            <input
              id={`cantidad-${producto.id}`}
              type="number"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={manejarCambioCantidad}
              className={styles.quantityInput}
            />
          </div>

          <p className={styles.detalleStock}>
            Stock disponible: {producto.stock}
          </p>

          <button className={styles.buyBtn} onClick={manejarAgregarAlCarrito}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
