// alert("hi!");

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// const socket = new WebSocket("http://localhost:3000");
// http -> ws로 프로토콜 변경
// `(백틱) 이용한 템플릿 리터럴 활용
const socket = new WebSocket(`ws://${window.location.host}`); 

socket.addEventListener("open", () => {
    console.log("Connected to Server")
})

// 서버로부터 받은 메시지 보이기
socket.addEventListener("message", (message) => {
    console.log("Just got this : ", message.data, "from the server");
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server")
})

function handleSubmit(event) {
    event.preventDefault(); // ?
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);