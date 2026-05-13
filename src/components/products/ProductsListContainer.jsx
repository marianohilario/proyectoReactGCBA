import { useState, useEffect } from "react";
import ProductList from "./ProductsList";
import Loader from "../Loader";
import styles from "./products.module.css";

const ProductsListContainer = ({ titulo, destacados }) => {
  const [products, setProducts] = useState([]);
  const [productosAMostrar, setProductosAMostrar] = useState([]);
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

  useEffect(() => {
    if (destacados) {
      setProductosAMostrar(products.filter((product) => product.destacado));
    } else {
      setProductosAMostrar(products);
    }
  }, [products]);

  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader height="100px" />
    </div>
  ) : (
    <div className={styles.container}>
      <h2 className={"title"}>{titulo}</h2>
      <ProductList products={productosAMostrar} />
    </div>
  );
};

export default ProductsListContainer;
