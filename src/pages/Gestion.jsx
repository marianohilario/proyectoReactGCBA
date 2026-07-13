import { useState } from "react";
import FormularioContainer from "../components/products/agregarProducto/formularioContainer/FormularioContainer";
import GestionCupones from "../components/gestionCupones/GestionCupones";
import styles from "./gestion.module.css";

const Gestion = () => {
  const [tabActiva, setTabActiva] = useState("productos");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${tabActiva === "productos" ? styles.tabActive : ""}`}
          onClick={() => setTabActiva("productos")}
        >
          Productos
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${tabActiva === "cupones" ? styles.tabActive : ""}`}
          onClick={() => setTabActiva("cupones")}
        >
          Cupones
        </button>
      </div>

      {tabActiva === "productos" ? <FormularioContainer /> : <GestionCupones />}
    </div>
  );
};

export default Gestion;
