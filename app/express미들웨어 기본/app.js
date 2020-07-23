const express = require('express');
const http = require('http');

const app = express();

app.use((req, res, next) => {
  console.log('첫 번째 미들웨어에서 요청을 처리함');
  req.user = 'mike';
  next();
});
app.use('/', (req, res, next) => {
  console.log('두 번째 미들웨어에서 요청을 처리함');
  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
  res.write(`
    <h1>Exress 서버에서 ${req.user}가 응답한 결과입니다.</h1>
    <div>User-Agent : ${req.header('User-Agent')}</div>
    <div>Param name : ${req.query.name}</div>
  `);
  res.end();
});

http.createServer(app).listen(3000, () => {
  console.log('Express 서버가 3000번에서 시작됨');
});
