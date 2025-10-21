import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MainLayout from './layouts/MainLayout';
import './App.css';

// Pages
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import LoginSignup from './pages/LoginSignUp/LoginSignUp';
import AboutContact from './pages/AboutContact/AboutContact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';



function App() {


  return (
    <>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/about" element={<AboutContact/>} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
