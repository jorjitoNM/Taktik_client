import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AnimatedRoutes from './AnimatedRoutes';
import PantallaInicio from "./components/PantallaInicio";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<PantallaInicio />} />
        </Routes>
    </Router>
  );
}

export default App;