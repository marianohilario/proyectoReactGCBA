import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import CuponesForm from "./cuponesForm/CuponesForm";

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [descuento, setDescuento] = useState("");
  const [codigo, setCodigo] = useState("");

  const fetchCupones = async () => {
    try {
      const cuponesCollection = collection(db, "cupones");
      const snapshot = await getDocs(cuponesCollection);
      const cuponesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCupones(cuponesData);
    } catch (error) {
      console.error("Error al obtener los cupones:", error);
      toast.error(
        "Error al obtener los cupones. Por favor, intenta nuevamente.",
      );
    }
  };

  const agregarCupon = async (e) => {
    e.preventDefault();
    if (!codigo || !descuento) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const cuponesCollection = collection(db, "cupones");
      const porcentajeDescuento = parseFloat(descuento);
      if (
        isNaN(porcentajeDescuento) ||
        porcentajeDescuento <= 0 ||
        porcentajeDescuento > 100
      ) {
        toast.error(
          "Por favor, ingresa un descuento válido (entre 1% y 100%).",
        );
        return;
      }
      await addDoc(cuponesCollection, {
        codigo,
        descuento: porcentajeDescuento,
      });
      toast.success("Cupon agregado con éxito.");
      setCodigo("");
      setDescuento("");
      fetchCupones();
    } catch (error) {
      console.error("Error al agregar el cupon:", error);
      toast.error("Error al agregar el cupon. Por favor, intenta nuevamente.");
    }
  };

  const eliminarCupon = async (id) => {
    try {
      const cuponDoc = doc(db, "cupones", id);
      await deleteDoc(cuponDoc);
      toast.success("Cupon eliminado con éxito.");
      fetchCupones();
    } catch (error) {
      console.error("Error al eliminar el cupon:", error);
      toast.error("Error al eliminar el cupon. Por favor, intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchCupones();
  }, []);

  return (
    <CuponesForm
      cupones={cupones}
      codigo={codigo}
      setCodigo={setCodigo}
      descuento={descuento}
      setDescuento={setDescuento}
      agregarCupon={agregarCupon}
      eliminarCupon={eliminarCupon}
    />
  );
};

export default GestionCupones;
