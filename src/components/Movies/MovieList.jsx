import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { io } from 'socket.io-client';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const socket = io(import.meta.env.VITE_API_URL, { withCredentials: true });

  useEffect(() => {
    fetchMovies();

    socket.on('movie-added', (newMovie) => {
      setMovies(prev => [...prev, newMovie]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMovies = async () => {
    const { data } = await API.get('/movies');
    setMovies(data);
  };

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
