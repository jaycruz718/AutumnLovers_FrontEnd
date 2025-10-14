import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import AboutContact from './pages/AboutContact';
import Events from './pages/Events';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<AboutContact/>} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </>
  );
}

export default App;
