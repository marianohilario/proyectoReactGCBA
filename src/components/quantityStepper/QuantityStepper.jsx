import styles from "./quantityStepper.module.css";

const QuantityStepper = ({ value, min = 1, max, onChange }) => {
  const decrementar = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    onChange(Math.max(value - 1, min));
  };

  const incrementar = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    const maximo = max ?? Infinity;
    onChange(Math.min(value + 1, maximo));
  };

  return (
    <div className={styles.stepper}>
      <button
        type="button"
        className={styles.stepperBtn}
        onClick={decrementar}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span className={styles.stepperValue}>{value}</span>
      <button
        type="button"
        className={styles.stepperBtn}
        onClick={incrementar}
        disabled={max != null && value >= max}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
