import { useState, useEffect } from "react";
import ProductList from "./ProductsList";
import Loader from "../Loader";
import styles from "./products.module.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductsListContainer = ({ titulo, destacados }) => {
  const [products, setProducts] = useState([]);
  const [productosAMostrar, setProductosAMostrar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const productosFiltrados = productosAMostrar.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productsData = querySnapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      <div className={styles.searchWrapper}>
        <i className={`bi bi-search ${styles.searchIcon}`}></i>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <ProductList products={productosFiltrados} />
    </div>
  );
};

export default ProductsListContainer;
