import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Autumn Lovers</Link>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>

        {/* {user ? (
          <>
            <li>Hello, {user.name}</li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><NavLink to="/login">Login/SignUp</NavLink></li>
        )} */}
      </ul>
    </nav>
  );
}
