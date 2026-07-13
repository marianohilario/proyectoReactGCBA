import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import NuevoProducto from "./pages/GestionProductos";
import Nosotros from "./pages/Nosotros";
import ProductoDetalle from "./components/products/ProductoDetalle";
import Cart from "./components/cart/Cart";
import Login from "./components/login/Login";
import Register from "./register/Register";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nuevo-producto" element={<NuevoProducto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
