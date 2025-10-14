import { Link, NavLink } from 'react-router-dom';


export default function NavBar(){

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Autumn Lovers</Link>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/about">About/Contact</NavLink></li>
        <li><NavLink to="/login">Login/SignUp</NavLink></li>
      </ul>
    </nav>
  );
}