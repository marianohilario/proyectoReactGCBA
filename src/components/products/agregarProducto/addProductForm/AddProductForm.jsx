import { useState, useEffect } from "react";
import styles from "./addProductForm.module.css";

const AddProductForm = ({
  manejarEnvio,
  manejarCambio,
  datosForm,
  setImagenFile,
  imagenFile,
  loadingImg,
  cancelarEdicion,
  productoAEditar,
}) => {
  const [previewUrl, setPreviewUrl] = useState(datosForm.imagen || null);

  useEffect(() => {
    if (imagenFile) {
      const objectUrl = URL.createObjectURL(imagenFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(datosForm.imagen || null);
  }, [imagenFile, datosForm.imagen]);

  useEffect(() => {
    setImagenFile(null);
  }, [datosForm.id]);

  const disabled =
    loadingImg ||
    datosForm.nombre.trim() === "" ||
    datosForm.precio <= 0 ||
    datosForm.stock <= 0;

  return (
    <form className={styles.formCard} onSubmit={manejarEnvio}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>
          {productoAEditar ? "Editar Producto" : "Agregar Producto"}
        </h3>
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
        <div className={`${styles.formGroup} ${styles.imageFormGroup}`}>
          <label className={styles.label}>Imagen</label>
          <label htmlFor="inputImagen" className={styles.imagePreview}>
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Vista previa del producto"
                  className={styles.imagePreviewImg}
                />
                <span className={styles.imagePreviewOverlay}>
                  <i className="bi bi-camera"></i>
                  Cambiar imagen
                </span>
              </>
            ) : (
              <span className={styles.imagePreviewPlaceholder}>
                <i className="bi bi-image"></i>
                Elegir imagen...
              </span>
            )}
          </label>
          <input
            id="inputImagen"
            className={styles.fileInputHidden}
            type="file"
            name="imagen"
            accept="image/*"
            onChange={(e) => setImagenFile(e.target.files[0])}
          />
        </div>
        <div className={styles.formActions}>
          <button
            className={
              styles.submitBtn + " " + (disabled ? styles.disabled : "")
            }
            type="submit"
            disabled={disabled}
          >
            {loadingImg
              ? "Cargando..."
              : productoAEditar
                ? "Editar Producto"
                : "Agregar Producto"}
          </button>
          {productoAEditar && (
            <button
              className={styles.submitBtn}
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
