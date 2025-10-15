import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Autumn Lovers</Link>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>

        {user ? (
          <>
            <li>Hello, {user}</li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><NavLink to="/login">Login/SignUp</NavLink></li>
        )}
      </ul>
    </nav>
  );
}
