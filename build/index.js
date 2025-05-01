  const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5200;

// Middleware
app.use(express.json()); // <-- Важно! Иначе req.body будет undefined
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('../routes/auth');
const paypalRoutes = require('../routes/paypal');
const userRoutes = require('../routes/users');

app.use('/api/paypal', paypalRoutes); // ✅ Префикс
app.use('/api/users', userRoutes);
app.use(authRoutes);

// Статические файлы
const rootDir = path.join(__dirname, '..');
app.use(express.static(path.join(rootDir, 'dist')));
app.use('/assets', express.static(path.join(rootDir, 'assets')));

// Получить текущего пользователя
app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, email: req.user.email });
  } else {
    res.json({ loggedIn: false });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
