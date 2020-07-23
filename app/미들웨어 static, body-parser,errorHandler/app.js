const express = require('express');
const http = require('http');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const app = express();

app.use('/', serveStatic(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

router.route('/process/login/:name').post((req, res) => {
  console.log('/process/login 처리함');
  const { name } = req.params;
  const id = req.body.id || req.query.id;
  const pw = req.body.pw || req.query.pw;

  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
  res.write(`
      <div>id: ${name}</div>
      <div>id: ${id}</div>
      <div>pw : ${pw}</div>
    `);
  res.end();
});

app.route('/').get((req, res) => {
  res.redirect('/login.html');
});

app.use('/', router);

const expressErrorHandler = require('express-error-handler');

const errorHandler = expressErrorHandler({
  static: {
    404: path.join(__dirname, 'public', '404.html'),
  },
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000);
