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
    <div className="container">
      <h1>MovieHub 🎬</h1>
      {movies.map(movie => (
        <div key={movie._id} className="movie-card">
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Average Rating: {movie.averageRating?.toFixed(1) || "No ratings yet"}</p>
          <a href={`/movies/${movie._id}`}>View Details</a>
        </div>
      ))}
    </div>
  );
  
}

export default MovieList;
