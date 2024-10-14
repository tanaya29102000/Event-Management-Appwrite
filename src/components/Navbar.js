import { Link } from 'react-router-dom';
import './Navbar.css'; // Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Event Management</h1>
      <div className="nav-links">
        <Link to="/" className="nav-button">Add Event</Link>
        <Link to="/show" className="nav-button">Show Event</Link>
      </div>
    </nav>
  );
};

export default Navbar;
