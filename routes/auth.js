const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('../lib/prisma.cjs');
require('dotenv').config();

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    // Сохраняем или находим пользователя
    const user = await prisma.userSimvai.upsert({
      where: { email },
      update: {},
      create: { email, name }
    });

    done(null, user); // передаём объект в сессию
  } catch (err) {
    console.error('Ошибка при upsert пользователя:', err);
    done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.email); // сохраняем только email
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await prisma.userSimvai.findUnique({ where: { email } });
    done(null, user); // будет доступен как req.user
  } catch (err) {
    done(err);
  }
});

// 🔐 Старт авторизации
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

// 🔁 Callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // после логина — на главную
  }
);

// 🚪 Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
