import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // 👈 We'll add some CSS

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/add">Add Movie</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
