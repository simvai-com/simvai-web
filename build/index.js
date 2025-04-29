const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 5200;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

// Serve static files
const rootDir = path.join(__dirname, '..');
app.use(express.static(path.join(rootDir, 'dist')));
app.use('/assets', express.static(path.join(rootDir, 'assets')));

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
