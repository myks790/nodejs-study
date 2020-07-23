const express = require('express');
const http = require('http');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

app.use('/', serveStatic(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true,
}));

const router = express.Router();

router.route('/product').get((req, res) => {
  console.log('/pruduct 호출됨');
  if (req.session.user) {
    res.redirect('/product.html');
  } else {
    res.redirect('/login.html');
  }
});

router.route('/login').post((req, res) => {
  console.log('로그인 호출됨');
  const paramId = req.body.id || req.query.id;
  const pw = req.body.pw || req.query.pw;

  if (req.session.user) {
    console.log('이미 로그인되어 있어 상품페이지로 이동합니다.');
    res.redirect('/product.html');
  } else {
    req.session.user = {
      id: paramId,
      name: 'sh',
      authorized: true,
    };
  }
  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
  res.write(`
      <h1>로그인 성공</h1>
      <div>id: ${paramId}</div>
      <div>pw : ${pw}</div>
      <br><br><a href='/product'>상품 페이지로 이동하기</a>
    `);
  res.end();
});

router.route('/logout').get((req, res) => {
  console.log('로그아웃 호출됨');

  if (req.session.user) {
    console.log('로그아웃 합니다.');
    req.session.destroy((err) => {
      if (err) throw err;
      console.log('세션을 삭제하고 로그아웃 되었습니다.');
      res.redirect('/login.html');
    });
  } else {
    console.log('아직 로그인되어 있지 않습니다.');
    res.redirect('/login.html');
  }
});

app.use('/', router);

http.createServer(app).listen(3000);
