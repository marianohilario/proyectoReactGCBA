import styles from "./cuponesForm.module.css";

const CuponesForm = ({
  cupones,
  codigo,
  setCodigo,
  descuento,
  setDescuento,
  agregarCupon,
  eliminarCupon,
}) => {
  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={agregarCupon}>
        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>Nuevo Cupón</h3>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Código</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Código del cupón"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Descuento</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Descuento (%)"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
            />
          </div>
          <button className={styles.submitBtn} type="submit">
            Agregar Cupón
          </button>
        </div>
      </form>
      <hr />
      <h3>Lista de Cupones</h3>

      <ul className={styles.cuponList}>
        {cupones.map((cupon) => (
          <li key={cupon.id} className={styles.cuponItem}>
            <div className={styles.cuponDetails}>
              <span className={styles.cuponCodigo}>{cupon.codigo}</span>
              <span className={styles.cuponDescuento}>
                {cupon.descuento}% OFF
              </span>
            </div>
            <button
              className={styles.removeBtn}
              type="button"
              onClick={() => eliminarCupon(cupon.id)}
              aria-label={`Eliminar cupón ${cupon.codigo}`}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CuponesForm;
