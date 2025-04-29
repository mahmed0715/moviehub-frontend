import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import { io } from 'socket.io-client';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const socket = useRef(null); // useRef to avoid re-creating socket
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMovie();

    socket.current = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    socket.current.on('rating-updated', (updatedMovie) => {
      if (updatedMovie._id === id) {
        setMovie(updatedMovie);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [id]);

  const fetchMovie = async () => {
    try {
      const { data } = await API.get(`/movies/${id}`);
      setMovie(data);
      const userRating = data.ratings.find((r) => r.userId === userId);
      setRating(userRating ? userRating.rating : 0);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
  };

  const handleRating = async () => {
    try {
      await API.post(`/movies/${id}/rate`, { rating: Number(rating) });
      alert('Rating submitted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Rating failed');
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{movie.title}</h2>
      <p style={{ marginBottom: '1rem' }}>{movie.description}</p>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
          placeholder="Rate this movie"
          style={{ padding: '0.5rem', width: '60px', marginRight: '10px' }}
        />
        <button onClick={handleRating} style={{ padding: '0.5rem 1rem' }}>
          Submit Rating
        </button>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Ratings:</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {movie.ratings.map((r, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            <strong>User {r.userId}</strong>: {r.rating}/10
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
