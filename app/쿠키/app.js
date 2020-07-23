const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

const router = express.Router();

router.route('/showCookie').get((req, res) => {
  console.log('/showCookie 호출됨');
  res.send(req.cookies);
});

router.route('/setCookie').get((req, res) => {
  console.log('/setCookie 호출됨');
  res.cookie('user', {
    id: 'ksh',
    name: 'SangHun',
  });
  res.end();
});

app.use('/', router);

http.createServer(app).listen(3000);
