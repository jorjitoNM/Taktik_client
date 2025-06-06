import HomeScreen from '../homeComponent/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          {/* <Route path="/login" element={<LoginScreen />} /> */}
          {/* <Route path="/register" element={<RegisterScreen />} /> */}
          <Route path="/" element={<HomeScreen />} />
        </Routes>
    </Router>
  );
}

export default App