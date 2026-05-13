import ProductsListContainer from "../components/products/ProductsListContainer";

const Inicio = () => {
  return (
    <ProductsListContainer titulo="Productos Destacados" destacados={true} />
  );
};

export default Inicio;
