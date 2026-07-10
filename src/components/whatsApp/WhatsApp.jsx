import styles from "./whatsApp.module.css";

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/5491151339874"
      className={styles.whatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
};

export default WhatsApp;
