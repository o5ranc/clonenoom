// import { Express } from "express";
import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine","pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost://3000");


// http : 내장된 기본 패키지사용해서 express로 만든 서버 애플리케이션을 제공 하는중
// 하나의 포트에서 HTTP와 웹소켓 프로토콜을 모두 사용하는 방법
// HTTP 서버위에 웹소켓 서버를 추가로 만들어 준 방법!
const server = http.createServer(app);
const wss = new WebSocket.Server({server}); // 서버에 웹소켓 프로토콜을 추가하기 위함

// 기다렸다가 connection 이벤트 발생시 handleConnection 호출
wss.on("connection", (socket) => {
    // console.log(socket);
    console.log("Connected to Browser"); // 서버용 로그(터미널창)

    socket.on("message", (message) => {
        console.log(`${message}`);
    })

    socket.on("close", () => {
        console.log("Disconnected from Browser");
        socket.send("hello!");
    })
});

// app.listen(3000, handleListen)
server.listen(3000, handleListen);