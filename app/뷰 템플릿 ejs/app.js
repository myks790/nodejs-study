const express = require('express');
const http = require('http');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

http.createServer(app).listen(3000);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/login', (req, res) => {
  const context = { userid: req.body.id, username: req.body.name };
  res.render('login_success', context);
});
