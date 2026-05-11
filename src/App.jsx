import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import ProductsListContainer from "./components/products/ProductsListContainer";
import FormularioContainer from "./components/products/agregarProducto/formularioContainer/FormularioContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <ProductsListContainer />
        <FormularioContainer />
      </Layout>
    </>
  );
}

export default App;
