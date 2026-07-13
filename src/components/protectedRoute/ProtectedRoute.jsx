import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader";
import styles from "./protectedRoute.module.css";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader height="100px" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return (
      <div className={styles.restrictedContainer}>
        <i className={`bi bi-shield-lock ${styles.restrictedIcon}`}></i>
        <h2 className={"title"}>Acceso restringido</h2>
        <p className={styles.restrictedMessage}>
          La sección a la cual querés acceder se encuentra restringida.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
