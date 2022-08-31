const socket = io.connect();

const chatEmailInput = document.getElementById("chatEmail");
const startChatBtn = document.getElementById("startChatBtn");
const chatMsgsList = document.getElementById("chatMsgsList");
const chatMsg = document.getElementById("chatMsg");
const sendMsgBtn = document.getElementById("sendMsgBtn");
const chatList = document.getElementById("chatList");
const chatEntry = document.getElementById("chatEntry");

let email = "";

startChatBtn.addEventListener("click", () => startChat(chatEmailInput.value));
sendMsgBtn.addEventListener("click", () => sendMsg(chatMsg.value));

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

// send message to server
const sendMsg = (message) => {
  socket.emit("newMessage", message.toLowerCase());
  let newLi = document.createElement("li");
  newLi.classList.add("userMsg");
  newLi.textContent = `${email}: ${message}`;
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
