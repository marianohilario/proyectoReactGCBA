import { useState } from "react";
import AddProductForm from "../addProductForm/AddProductForm";

const FormularioContainer = () => {
  const [loading, setLoading] = useState(false);
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: 0,
    urlImagen: "",
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
    const apiKey = "fc5635c0f14bcd56f76fd0b365845ad4"; //  ¡Aquí va tu clave!
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

    const productoCompleto = { ...datosForm, urlImagen: urlImagen };
    console.log("Producto listo para enviar:", productoCompleto);
  };

  return (
    <AddProductForm
      manejarEnvio={manejarEnvio}
      manejarCambio={manejarCambio}
      setImagenFile={setImagenFile}
      imagenFile={imagenFile}
      datosForm={datosForm}
    />
  );
};

export default FormularioContainer;
