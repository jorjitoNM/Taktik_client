import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AnimatedRoutes from './AnimatedRoutes';
import LoginScreen from "./components/LoginScreen";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
    </Router>
  );
}

export default App;