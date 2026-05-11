import styles from "./socialNetworks.module.css";

const SocialNetworks = () => {
  return (
    <ul className={styles.socialNetworks}>
      <li className={styles.socialNetwork}>
        <i className="bi bi-instagram"></i>
      </li>
      <li className={styles.socialNetwork}>
        <i className="bi bi-facebook"></i>
      </li>
      <li className={styles.socialNetwork}>
        <i className="bi bi-twitter"></i>
      </li>
      <li className={styles.socialNetwork}>
        <i className="bi bi-linkedin"></i>
      </li>
    </ul>
  );
};

export default SocialNetworks;
