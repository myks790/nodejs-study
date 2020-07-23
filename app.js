const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

const dirList = [];
fs.readdirSync(path.join(__dirname, 'app'), { withFileTypes: true }).forEach((p) => {
  if (p.isDirectory()) {
    dirList.push(p.name);
  }
});

const app = express();
app.set('port', 8080);
app.use('/public', serveStatic(path.join(__dirname)));

http.createServer(app).listen(app.get('port'));

const router = express.Router();

router.route('/api/dirList').get((req, res) => {
  res.send(dirList);
  res.end();
});

router.route('/api/content').get((req, res) => {
  const dir = path.join(__dirname, 'app', req.query.id);
  fs.readdirSync(dir, { withFileTypes: false }).forEach((p) => {
    if (p.slice(-3) === '.js') {
      res.sendFile(path.join(dir, p));
    }
  });
});

app.use('/', router);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
