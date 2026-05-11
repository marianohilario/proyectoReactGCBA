import styles from "./addProductForm.module.css";

const AddProductForm = ({
  manejarEnvio,
  manejarCambio,
  datosForm,
  setImagenFile,
  imagenFile,
}) => {

  return (
    <form className={styles.formCard} onSubmit={manejarEnvio}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Agregar Producto</h3>
      </div>
      <div className={styles.formBody}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={datosForm.nombre}
            onChange={manejarCambio}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Precio</label>
          <input
            className={styles.input}
            type="number"
            name="precio"
            placeholder="Precio del producto"
            value={datosForm.precio}
            onChange={manejarCambio}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Stock</label>
          <input
            className={styles.input}
            type="number"
            name="stock"
            placeholder="Stock del producto"
            value={datosForm.stock}
            onChange={manejarCambio}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Imagen</label>
          <label htmlFor="inputImagen" className={styles.fileLabel}>
            <i className="bi bi-image"></i>
            <span>{imagenFile?.name || "Elegir imagen desde archivo"}</span>
          </label>
          <input
            id="inputImagen"
            className={styles.fileInputHidden}
            type="file"
            name="urlImagen"
            accept="image/*"
            onChange={(e) => setImagenFile(e.target.files[0])}
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          Agregar Producto
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
