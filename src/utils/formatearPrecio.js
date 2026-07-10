const formateador = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatearPrecio = (valor) => formateador.format(valor);
