import './App.css'
import HomeScreen from '../homeComponent/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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