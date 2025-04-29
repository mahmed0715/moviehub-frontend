import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import { io } from 'socket.io-client';
const userId = localStorage.getItem('userId');
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const socket = io(import.meta.env.VITE_API_URL, { withCredentials: true });

  useEffect(() => {
    fetchMovie();

    socket.on('rating-updated', (updatedMovie) => {
      if (updatedMovie._id === id) {
        setMovie(updatedMovie);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMovie = async () => {
    const { data } = await API.get(`/movies/${id}`);
    setMovie(data);
    console.log({ratings: data.ratings.find(r => r.userId === userId)?.rating})
    setRating(data.ratings.find(r => r.userId === userId)?.rating || 0);
  };

  const handleRating = async () => {
    try {
      await API.post(`/movies/${id}/rate`, { rating });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>

      <div>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
          min="1"
          max="10"
          placeholder="Rate this movie"
        />
        <button onClick={handleRating}>Submit Rating</button>
      </div>

      <h3>Ratings:</h3>
      <ul>
        {movie.ratings.map((r, index) => (
          <li key={index}>User {r.userId}: {socket.id} {r.rating}/10</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
