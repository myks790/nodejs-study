const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.listen(3000);
server.on('request', (req, res) => {
  const filepath = `${__dirname}/boat_house.jpg`;
  fs.readFile(filepath, (err, data) => {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.write(data);
    res.end();
  });
  // const infile = fs.createReadStream(filepath, { flags: 'r' });
  // infile.pipe(res);
});
