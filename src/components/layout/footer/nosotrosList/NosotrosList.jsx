import NosotrosCard from "../nosotrosCard/NosotrosCard";
import styles from "./nosotrosList.module.css";

const NosotrosList = ({ nosotros }) => {
  return (
    <div className={styles.nosotrosList}>
      {nosotros.map((miembro) => (
        <NosotrosCard miembro={miembro} key={miembro.id} />
      ))}
    </div>
  );
};

export default NosotrosList;
