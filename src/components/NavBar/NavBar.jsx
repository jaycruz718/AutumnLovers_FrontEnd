import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    //localStorage.removeItem('user');
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Autumn Lovers</Link>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>

        {user ? (
          <>
            <li>Hello, {user.name || user.userName || 'User'}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><NavLink to="/login">Login / SignUp</NavLink></li>
        )} 
      </ul>
    </nav>
  );
}
