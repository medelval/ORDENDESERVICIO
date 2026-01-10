import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModuloPage from './pages/ModuloPage'; // 👈 Importa pagina principal dondeesta formulario
import DetallePage from './pages/DetallePage';

function App() {
  return (
    // 1. Configura el Router
    <Router>       
        <Routes>
           /* Ruta raíz para mostrar el formulario o página inicial */
          <Route path="/" element={<ModuloPage />} />

          /* Ruta dinámica para mostrar detalle por id */
           <Route path="/:id" element={<DetallePage />} /> 
        </Routes>
      
    </Router>
  );
}

export default App;

