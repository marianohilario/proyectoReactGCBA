import styles from "./nosotrosCard.module.css";

const NosotrosCard = ({ miembro }) => {
  return (
    <div className={styles.nosotrosCard}>
      <img src={miembro.foto} alt={miembro.nombre} className={styles.image} />
      <h3 className={styles.name}>{miembro.nombre}</h3>
      <p className={styles.puesto}>{miembro.puesto}</p>
      <p className={styles.email}>{miembro.email}</p>
    </div>
  );
};

export default NosotrosCard;
