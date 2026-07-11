import { useState } from "react";
import AddProductForm from "../addProductForm/AddProductForm";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const FormularioContainer = () => {
  const [loading, setLoading] = useState(false);
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: 0,
    imagen: "",
  });
  const [imagenFile, setImagenFile] = useState(null);

  const manejarCambio = (evento) => {
    setDatosForm({
      ...datosForm,
      [evento.target.name]: evento.target.value,
    });
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setLoading(true);
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
    const urlImagen = imgbbData.data.url;

    const productoCompleto = { ...datosForm, imagen: urlImagen };

    try {
      const db = getFirestore();
      const productosCollection = collection(db, "productos");
      await addDoc(productosCollection, productoCompleto);
      toast.success("Producto agregado con éxito.");
      setDatosForm({
        nombre: "",
        precio: "",
        stock: 0,
        imagen: "",
      });
      setImagenFile(null);
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
      toast.error("Error al agregar el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
    console.log("Producto listo para enviar:", productoCompleto);
  };

  return (
    <AddProductForm
      manejarEnvio={manejarEnvio}
      manejarCambio={manejarCambio}
      setImagenFile={setImagenFile}
      imagenFile={imagenFile}
      datosForm={datosForm}
      loadingImg={loading}
    />
  );
};

export default FormularioContainer;
