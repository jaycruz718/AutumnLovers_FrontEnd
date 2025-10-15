import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import VideoComponent from './components/VideoComponent';
import './App.css';

// Pages
import Home from './pages/Home/Home';
import LoginSignup from './pages/LoginSignUp';
import AboutContact from './pages/AboutContact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';



function App() {

  return (
    <>
      <NavBar /> 
      <VideoComponent /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<AboutContact/>} />
        <Route path="/events" element={<Events />} />
        <Route path="/events" element={<EventDetail />} />
        
      </Routes>
    </>
  );
}

export default App;
