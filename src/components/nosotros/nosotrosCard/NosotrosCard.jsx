import styles from "./nosotrosCard.module.css";

const NosotrosCard = ({ miembro }) => {
  return (
    <div className={styles.nosotrosCard}>
      <div className={styles.imageWrapper}>
        <img src={miembro.foto} alt={miembro.nombre} className={styles.image} />
      </div>
      <div className={styles.divider} />
      <h3 className={styles.name}>{miembro.nombre}</h3>
      <p className={styles.puesto}>{miembro.puesto}</p>
      <p className={styles.email}>{miembro.email}</p>
    </div>
  );
};

export default NosotrosCard;
