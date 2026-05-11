import { useEffect, useState } from "react";
import NosotrosList from "./nosotrosList/NosotrosList";
import Loader from "../../Loader";
import SocialNetworks from "../../socialNetworks/SocialNetworks";
import styles from "./footer.module.css";
import WhatsApp from "../../whatsApp/WhatsApp";
const Footer = () => {
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
    }, 800);
  }, []);

  return (
    <footer className={styles.footer}>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader height="50px" />
        </div>
      ) : (
        <NosotrosList nosotros={nosotros} />
      )}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>&copy; 2026 - Mariano Hilario</p>
        <SocialNetworks />
      </div>
      <WhatsApp />
    </footer>
  );
};

export default Footer;
