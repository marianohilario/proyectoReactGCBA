import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./login.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const manejarCambioEmail = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(false);
  };

  const manejarBlurEmail = () => {
    if (email && !EMAIL_REGEX.test(email)) {
      setEmailError(true);
      toast.error("Ingresá un email válido");
    } else {
      setEmailError(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      toast.error("Ingresá un email válido");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("¡Inicio de sesión exitoso!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Error en el login");
      });
  };

  const disabledSubmit = !email || !password || emailError;

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleLogin}>
        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>Iniciar sesión</h3>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={`${styles.input} ${emailError ? styles.inputError : ""}`}
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={manejarCambioEmail}
              onBlur={manejarBlurEmail}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={revealPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setRevealPassword(!revealPassword)}
                aria-label={
                  revealPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {revealPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
          </div>

          <button
            className={
              styles.submitBtn + (disabledSubmit ? " " + styles.disabled : "")
            }
            type="submit"
            disabled={disabledSubmit}
          >
            Iniciar sesión
          </button>

          <p className={styles.text}>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className={styles.link}>
              Registrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
