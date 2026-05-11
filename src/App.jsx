import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import ProductsListContainer from "./components/products/ProductsListContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <ProductsListContainer />
      </Layout>
    </>
  );
}

export default App;
