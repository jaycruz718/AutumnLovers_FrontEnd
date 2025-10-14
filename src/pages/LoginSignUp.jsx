import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake login
    if (form.email && form.password) {
      localStorage.setItem('user', form.email); // Simulate login
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login or Sign Up</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Continue</button>
    </form>
  );
}
