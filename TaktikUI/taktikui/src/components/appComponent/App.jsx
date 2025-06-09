import './App.css'
// import HomeScreen from '../homeComponent/HomeScreen';
import ProjectScreen from '../projectComponent/ProjectScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          {/* <Route path="/login" element={<LoginScreen />} /> */}
          {/* <Route path="/register" element={<RegisterScreen />} /> */}
          {/* <Route path="/" element={<HomeScreen />} /> */}
          <Route path="/project/:projectId" element={<ProjectScreen />} />
        </Routes>
    </Router>
  );
}

export default App;