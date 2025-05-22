const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5200;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('../routes/auth');
const paypalRoutes = require('../routes/paypal');
const userRoutes = require('../routes/users');
const promoRoutes = require('../routes/promo');
const handleContactForm = require('../assets/javascripts/contact');

app.post('/contact', handleContactForm);
app.use('/api/paypal', paypalRoutes);
app.use('/api/users', userRoutes);
app.use(authRoutes);
app.use('/api', promoRoutes);

// Статические файлы
const rootDir = path.join(__dirname, '..');
app.use(express.static(path.join(rootDir, 'dist')));
app.use('/assets', express.static(path.join(rootDir, 'assets')));

// 🔥 Clean URLs для HTML-страниц
const staticPages = [
  'about', 'blogs', 'contact', 'faqs', 'page',
  'portfolio', 'services', 'single-blog', 'single-project',
  'single-service', 'team'
];

staticPages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(rootDir, 'public', `${page}.html`));
  });
});


// ✅ Новый маршрут: /event → pricing.html
app.get('/event', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'pricing.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// ✅ Редирект: /pricing.html → /event
app.get('/pricing.html', (req, res) => {
  res.redirect(301, '/event');
});

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
