import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import NuevoProducto from "./pages/NuevoProducto";
import Nosotros from "./pages/Nosotros";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nuevo-producto" element={<NuevoProducto />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Route>
    </Routes>
  );
}

export default App;
