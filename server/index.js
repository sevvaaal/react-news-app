const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.js');
const newsRoutes = require('./routes/news.js');
app.use('/auth', authRoutes);
app.use('/news', newsRoutes);

app.get('/', (req, res) => {
  res.send('Backend çalışıyor Max!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor 🏁`);
});

