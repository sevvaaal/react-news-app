import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, setAppUsername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      setAppUsername(username);
      onLogin();
    } catch (err) {
      alert('Giriş hatası: ' + err.response?.data?.message || 'Sunucu hatası');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Giriş Yap</button>
    </form>
  );
};

export default Login;
