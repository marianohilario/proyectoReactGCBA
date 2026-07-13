import { useEffect, useState } from "react";
import AddProductForm from "../addProductForm/AddProductForm";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase/config";

import styles from "./formularioContainer.module.css";
import { formatearPrecio } from "../../../../utils/formatearPrecio";

const estadoInicialFormulario = {
  nombre: "",
  precio: "",
  stock: 0,
  imagen: "",
  destacado: false,
};

const FormularioContainer = () => {
  const [loading, setLoading] = useState(false);
  const [datosForm, setDatosForm] = useState(estadoInicialFormulario);
  const [imagenFile, setImagenFile] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm(productoAEditar);
    } else {
      setDatosForm(estadoInicialFormulario);
    }
  }, [productoAEditar]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = getFirestore();
        const productosCollection = collection(db, "productos");
        const snapshot = await getDocs(productosCollection);
        const productosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    if (datosForm.nombre.trim() === "" || datosForm.precio <= 0) {
      toast.error(
        "Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.",
      );
      return;
    }
    setLoading(true);
    let urlImagen;
    const sameImage = productos.find(
      (producto) => producto.imagen === datosForm.imagen,
    );
    if (imagenFile && !sameImage) {
      const apiKey = "fc5635c0f14bcd56f76fd0b365845ad4";
      const formData = new FormData();
      formData.append("image", imagenFile);

      const respuesta = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const imgbbData = await respuesta.json();
      urlImagen = imgbbData.data.url;
    }

    const productoCompleto = {
      ...datosForm,
      ...(urlImagen ? { imagen: urlImagen } : {}),
    };

    try {
      const db = getFirestore();
      const productosCollection = collection(db, "productos");
      if (productoAEditar) {
        const productoDoc = doc(db, "productos", productoAEditar.id);
        await updateDoc(productoDoc, productoCompleto);
        toast.success("Producto editado con éxito.");
        setProductos((prevProductos) =>
          prevProductos.map((producto) =>
            producto.id === productoAEditar.id
              ? { ...producto, ...productoCompleto }
              : producto,
          ),
        );
        setProductoAEditar(null);
      } else {
        const rta = await addDoc(productosCollection, productoCompleto);
        console.log("rta: ", rta);
        toast.success("Producto agregado con éxito.");
        setProductos((prevProductos) => [
          ...prevProductos,
          { ...productoCompleto, id: rta._key.path.segments[1] },
        ]);
      }
      setDatosForm(estadoInicialFormulario);
      setImagenFile(null);
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
      toast.error("Error al agregar el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const manejarEliminarProducto = async (productoId) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?",
    );
    if (!confirmacion) {
      return;
    }
    try {
      const db = getFirestore();
      const productoDoc = doc(db, "productos", productoId);
      await deleteDoc(productoDoc);
      toast.success("Producto eliminado con éxito.");
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== productoId),
      );
    } catch (error) {
      console.error("Error al eliminar el producto de Firestore:", error);
      toast.error("Error al eliminar el producto. Intenta nuevamente.");
    }
  };

  const manejarEditarProducto = (producto) => {
    setProductoAEditar(producto);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  };

  return (
    <div className={styles.formularioContainer_container}>
      <h2 className={"title"} style={{ width: "fit-content" }}>
        Gestión de Productos
      </h2>
      <AddProductForm
        manejarEnvio={manejarEnvio}
        manejarCambio={manejarCambio}
        setImagenFile={setImagenFile}
        imagenFile={imagenFile}
        datosForm={datosForm}
        loadingImg={loading}
        cancelarEdicion={cancelarEdicion}
        productoAEditar={!!productoAEditar}
      />
      <hr />
      <h3>Lista de Productos</h3>
      <ul className={styles.productList}>
        {productos.map((producto) => (
          <li key={producto.id} className={styles.productItem}>
            <div className={styles.productDetails}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className={styles.productImage}
              />
              <span className={styles.productName}>{producto.nombre}</span>
              <span className={styles.productPrice}>
                ${formatearPrecio(producto.precio)}
              </span>
              <span className={styles.productStock}>
                Stock: {producto.stock}
              </span>
            </div>
            <div className={styles.productActions}>
              <button
                className={styles.editBtn}
                onClick={() => manejarEditarProducto(producto)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => manejarEliminarProducto(producto.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioContainer;
