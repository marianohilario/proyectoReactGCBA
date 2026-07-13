import { useState } from "react";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartContext";
import styles from "./cuponCarrito.module.css";

const CuponCarrito = () => {
  const { cuponAplicado, aplicandoCupon, aplicarCupon, quitarCupon } =
    useCartContext();
  const [codigo, setCodigo] = useState("");

  const manejarAplicarCupon = async (e) => {
    e.preventDefault();
    const codigoLimpio = codigo.trim();
    if (!codigoLimpio) {
      toast.error("Ingresá un código de cupón");
      return;
    }

    const { exito, cupon } = await aplicarCupon(codigoLimpio);
    if (!exito) {
      toast.error("Cupón no válido");
      return;
    }
    toast.success(`Cupón aplicado: -${cupon.descuento}%`);
    setCodigo("");
  };

  const manejarQuitarCupon = () => {
    quitarCupon();
    toast.info("Cupón removido");
  };

  if (cuponAplicado) {
    return (
      <div className={styles.cuponAplicado}>
        <span className={styles.cuponInfo}>
          Cupón {cuponAplicado.codigo} (-{cuponAplicado.descuento}%)
        </span>
        <button
          className={styles.removeBtn}
          type="button"
          onClick={manejarQuitarCupon}
          aria-label="Quitar cupón aplicado"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    );
  }

  return (
    <form className={styles.cuponForm} onSubmit={manejarAplicarCupon}>
      <input
        className={styles.input}
        type="text"
        placeholder="Código de cupón"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button
        className={styles.applyBtn}
        type="submit"
        disabled={aplicandoCupon}
      >
        Aplicar
      </button>
    </form>
  );
};

export default CuponCarrito;
