import { useState, useEffect } from "react";
import ProductList from "./ProductsList";
import Loader from "../Loader";
import styles from "./products.module.css";

const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.productos);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, []);

  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader height="100px" />
    </div>
  ) : (
    <div className={styles.container}>
      <h2 className={"title"}>Listado de Productos</h2>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsListContainer;
