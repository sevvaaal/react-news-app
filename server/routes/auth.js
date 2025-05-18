const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USERS_FILE = './users.json';

const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'Bu kullanıcı zaten var.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  writeUsers(users);

  res.json({ message: 'Kayıt başarılı!' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Hatalı kullanıcı adı veya şifre.' });
  }

  const token = jwt.sign({ username }, 'gizliAnahtar', { expiresIn: '1h' });

  res.json({ message: 'Giriş başarılı!', token });
});

module.exports = router;
