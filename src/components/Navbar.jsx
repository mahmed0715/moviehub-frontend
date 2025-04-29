import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/add">Add Movie</Link>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
