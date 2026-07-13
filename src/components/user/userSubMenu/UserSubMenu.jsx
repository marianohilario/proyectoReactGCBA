import styles from "./userSubMenu.module.css";
import { useAuth } from "../../../context/AuthContext";

const UserSubMenu = ({ show }) => {
  const { user, logout } = useAuth();

  if (!show) return null;

  return (
    <div className={styles.userSubMenu}>
      <div className={styles.userInfo}>
        <i className={`bi bi-person-circle ${styles.userInfoIcon}`}></i>
        <span className={styles.userEmail}>{user.email}</span>
      </div>
      <button className={styles.logoutBtn} type="button" onClick={logout}>
        <i className="bi bi-box-arrow-right"></i>
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserSubMenu;
