import { useEffect, useState } from "react";
// import NosotrosList from "../../nosotros/nosotrosList/NosotrosList";
import Loader from "../../Loader";
import SocialNetworks from "../../socialNetworks/SocialNetworks";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy; 2026 - Mariano Hilario</p>
    </footer>
  );
};

export default Footer;
