import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import ProductsListContainer from "./components/products/ProductsListContainer";
import FormularioContainer from "./components/products/agregarProducto/formularioContainer/FormularioContainer";
import { Route, Routes } from "react-router-dom";
import NosotrosListContainer from "./components/nosotros/nosotrosListContainer/NosotrosListContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Bienvenido a mi Ecommerce 👋🏼</h1>} />
        <Route path="/productos" element={<ProductsListContainer />} />
        <Route path="/nuevo-producto" element={<FormularioContainer />} />
        <Route path="/nosotros" element={<NosotrosListContainer />} />
      </Route>
    </Routes>
  );
}

export default App;
