const socket = io.connect();

const chatEmailInput = document.getElementById("chatEmail");

const startChatBtn = document.getElementById("startChatBtn");
const startChatBtnLoggedIn = document.getElementById("startChatBtnLoggedIn");
const chatMsgsList = document.getElementById("chatMsgsList");
const chatMsg = document.getElementById("chatMsg");
const sendMsgBtn = document.getElementById("sendMsgBtn");
const chatList = document.getElementById("chatList");
const chatEntry = document.getElementById("chatEntry");

let email = "";

if (startChatBtn) {
  startChatBtn.addEventListener("click", () => startChat(chatEmailInput.value));
  chatEmailInput.addEventListener("keydown", (e) =>
    startChatNotLoggedIn(e, chatEmailInput.value)
  );
} else {
  startChatBtnLoggedIn.addEventListener("click", () => startChatLoggedIn());
}
sendMsgBtn.addEventListener("click", () => sendMsg(chatMsg.value));
chatMsg.addEventListener("keydown", (e) => sendMsgKeyDown(e, chatMsg.value));

socket.on("newReply", (reply) => appendReply(reply));

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

// append server reply:
const appendReply = (reply) => {
  let newLi = document.createElement("li");
  newLi.classList.add("botResponse");
  newLi.textContent = `chatBot: ${reply}`;
  setTimeout(() => {
    chatList.appendChild(newLi);
  }, 1500);
};

const sendMsgKeyDown = (e, message) => {
  if (e.keyCode === 13) {
    sendMsg(message);
  }
};

const startChatNotLoggedIn = (e, emailValue) => {
  if (e.keyCode === 13) {
    startChat(emailValue);
  }
};

// send message to server
const sendMsg = (message) => {
  socket.emit("newMessage", message.toLowerCase());
  let newLi = document.createElement("li");
  newLi.classList.add("userMsg");
  newLi.textContent = `${email || "you"}: ${message}`;
  chatList.appendChild(newLi);
  chatMsg.value = "";
};

const startChat = (userEmail) => {
  if (ValidateEmail(userEmail)) {
    socket.emit("initiateChat", userEmail);
    chatMsgsList.style.display = "block";
    chatEntry.style.display = "none";
    email = userEmail;
  }
};

const startChatLoggedIn = () => {
  socket.emit("initiateChat");
  chatMsgsList.style.display = "block";
  chatEntry.style.display = "none";
};
