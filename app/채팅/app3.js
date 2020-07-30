const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();

app.use('/', express.static(__dirname));

const server = http.createServer(app).listen(3000);

const loginIds = {};

const io = socketio.listen(server);

// 응답 메시지 전송 메소드
function sendResponse(socket, command, code, message) {
  const statusObj = { command, code, message };
  socket.emit('response', statusObj);
}

io.sockets.on('connection', (socket) => {
  // 'login' 이벤트를 받았을 때의 처리
  socket.on('login', (login) => {
    console.log('login 이벤트를 받았습니다.');
    console.dir(login);

    // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
    console.log(`접속한 소켓의 ID : ${socket.id}`);
    loginIds[login.id] = socket.id;

    console.log('접속한 클라이언트 ID 갯수 : %d', Object.keys(loginIds).length);

    sendResponse(socket, 'login', '200', '로그인되었습니다.');
  });

  // 'message' 이벤트를 받았을 때의 처리
  socket.on('message', (message) => {
    console.log('message 이벤트를 받았습니다.');
    console.dir(message);

    if (message.recepient === 'ALL') {
      // 나를 포함한 모든 클라이언트에게 메시지 전달
      console.dir('나를 포함한 모든 클라이언트에게 message 이벤트를 전송합니다.');
      io.sockets.emit('message', message);
    } else if (loginIds[message.recepient]) {
      // 일대일 채팅 대상에게 메시지 전달
      io.sockets.connected[loginIds[message.recepient]].emit('message', message);
      sendResponse(socket, 'message', '200', '메시지를 전송했습니다.');
    } else {
      sendResponse(socket, 'login', '404', '상대방의 로그인 ID를 찾을 수 없습니다.');
    }
  });
});
