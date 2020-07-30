const express = require('express');
const http = require('http');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(session({
  secret: 'SAME_SECRET',
  cookie: { httpOnly: true/* , secure: true */ },
  saveUninitialized: true,
  resave: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  return done(null, user.id);
});
passport.deserializeUser((user, done) => {
  console.log('deserializeUser');
  return done(null, user);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'pw',
  },
  (id, pw, done) => {
    const dbUser = { id: 'id', pw: 'pw' };
    if (pw !== dbUser.pw) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, dbUser);
  },
));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/product',
  failureRedirect: '/',
}));

app.get('/product', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(`${__dirname}/product.html`);
  } else {
    res.redirect('/');
  }
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/login.html`);
});

http.createServer(app).listen(3000);
