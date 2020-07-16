const http = require('http');

const server = http.createServer();

const port = 3000;
server.listen(port, () => {
  console.log('웹서버가 시작되었습니다. : %d', port);
});

server.on('connection', (socket) => {
  const addr = socket.address();
  console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

server.on('request', (req, res) => {
  console.log('클라이언트 요청이 들어왔습니다.');
  res.write(`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>응답페이지</title>
        </head>
        <body>
            <h1>nodeJS로부터 응답</h1>
        </body>    
    </html>
    `);
  res.end();
});

server.on('close', () => {
  console.log('서버가 종료됩니다.');
});
