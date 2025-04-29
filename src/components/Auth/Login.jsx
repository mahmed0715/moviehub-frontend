import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userId);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
