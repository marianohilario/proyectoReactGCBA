import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
import styles from "./products.module.css";
import { useCartContext } from "../../context/CartContext";
import QuantityStepper from "../quantityStepper/QuantityStepper";
import { formatearPrecio } from "../../utils/formatearPrecio";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart, getCantidadActual } = useCartContext();

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      try {
        const response = await getDoc(doc(db, "productos", id));
        if (response.exists()) {
          setProducto({ id: response.id, ...response.data() });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
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

  const itemEnCarrito = getCantidadActual(producto.id);

  const manejarAgregarAlCarrito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    addToCart(producto, cantidad);
    toast.success(
      itemEnCarrito > 0
        ? "Cantidad actualizada"
        : "Producto agregado al carrito",
    );
  };

  const disabled =
    producto.stock === 0 ||
    cantidad > producto.stock ||
    cantidad === itemEnCarrito;

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
              {formatearPrecio(producto.precio)}
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
              max={producto.stock}
              onChange={setCantidad}
            />
          </div>

          <p className={styles.detalleStock}>
            Stock disponible: {producto.stock}
          </p>

          <button
            className={styles.buyBtn + " " + (disabled ? styles.disabled : "")}
            onClick={manejarAgregarAlCarrito}
            disabled={disabled}
            aria-label="Agregar al carrito"
          >
            {itemEnCarrito > 0 ? "Modificar cantidad" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
