const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // 모든 접속 허용
});

io.on("connection", (socket) => {
  console.log("기기 접속됨:", socket.id);

  // 1번 앱이 보낸 신호를 2번 앱으로, 혹은 그 반대로 전달
  socket.on("offer", (data) => {
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.broadcast.emit("answer", data);
  });

  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("기기 연결 해제");
  });
});

// Glitch는 기본적으로 3000번 포트를 사용합니다.
server.listen(3000, () => {
  console.log("시그널링 서버가 살아있습니다!");
});
