import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import NewsFeed from './components/NewsFeed';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  setUsername('');
};


  return (
    <div className="App">
      {!isLoggedIn && (
        <>
          <Register />
          <Login onLogin={() => setIsLoggedIn(true)} setAppUsername={setUsername}/>

          <p style={{ color: 'red' }}>🔒 Giriş yaptıktan sonra haberleri görebilirsin.</p>
        </>
      )}

      {isLoggedIn && (
        <>
          <h2>⭐ Hoş geldin {username} </h2>
          <button onClick={handleLogout}>Çıkış Yap</button>
          <NewsFeed />
        </>
      )}
    </div>
  );
}

export default App;
