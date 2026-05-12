import { useEffect, useState } from "react";
import NosotrosList from "../nosotrosList/NosotrosList";
import Loader from "../../Loader";
import styles from "./nosotrosListContainer.module.css";

const NosotrosListContainer = () => {
  const [nosotros, setNosotros] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("/data/nosotros.json")
        .then((response) => response.json())
        .then((data) => {
          setNosotros(data.nosotros);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader height="50px" />
        </div>
      ) : (
        <div className={styles.container}>
          <h2 className={"title"}>Conoce a nuestro equipo</h2>
          <NosotrosList nosotros={nosotros} />
        </div>
      )}
    </>
  );
};

export default NosotrosListContainer;
