import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./register.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      toast.error("Ingresá un email válido");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Usuario registrado con éxito");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quieresIngresar = window.confirm(
          "El correo electrónico ya se encuentra registrado. ¿Quieres intentar iniciar sesión?",
        );
        if (quieresIngresar) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error al registrar el usuario:", error);
        toast.error(
          "Error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>Crear una nueva cuenta</h3>
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

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button className={styles.submitBtn} type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
