import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieList from './components/Movies/MovieList';
import MovieDetails from './components/Movies/MovieDetails';
import AddMovie from './components/Movies/AddMovie';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_API_URL);


function App() {
    useEffect(() => {
        socket.on('movie-added', (newMovie) => {
          console.log('New movie added:', newMovie);
        });
    
        socket.on('rating-updated', (updatedMovie) => {
          console.log('Movie rating updated:', updatedMovie);
        });
    
        return () => {
          socket.off('movie-added');
          socket.off('rating-updated');
        };
      }, []);
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/add" element={<AddMovie />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
