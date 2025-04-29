import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

function AddMovie() {
  const [form, setForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/movies', form);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddMovie;
