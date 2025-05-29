import './App.css'

import HomeScreen from '../homeComponent/HomeScreen';

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

export default App;
