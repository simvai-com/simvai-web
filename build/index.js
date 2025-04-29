const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const authRoutes = require('../routes/auth');

const app = express();
const PORT = process.env.PORT || 5200;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const paypalRoutes = require('../routes/paypal');
app.use(paypalRoutes);

app.use(authRoutes);

// Serve static files
const rootDir = path.join(__dirname, '..');
app.use(express.static(path.join(rootDir, 'dist')));
app.use('/assets', express.static(path.join(rootDir, 'assets')));
app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, email: req.user.emails[0].value });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
