import basicLoad from "/assets/scripts/basic-load.js";

const socket = io("/");
document.addEventListener("DOMContentLoaded", function () {
	basicLoad().then((data) => {
		console.log(data);
		const userName = JSON.parse(sessionStorage.getItem("user")).username;
		document.getElementById("user").innerText = userName;
	});
});

const userName = JSON.parse(sessionStorage.getItem("user")).username;

document.getElementById("user").innerText = userName;

socket.emit("newUser", {
	user: userName,
});

socket.on("newUser", (data) => {
	newUserMessage(data.user);
});

socket.on("newMessage", (data) => {
	newMessage(data);
});

socket.on("userLeft", (data) => {
	userLeftMessage(data.user);
});

function newUserMessage(name) {
	const p = document.createElement("p");
	p.className = "new-user";
	p.innerText = `${name} joined the chat`;
	messages.append(p);
}

function userLeftMessage(name) {
	const p = document.createElement("p");
	p.className = "user-left";
	p.innerText = `${name} left the chat`;
	messages.append(p);
}

function newMessage(data, mine) {
	// Create element in my list
	const p = document.createElement("p");
	let name = data.user;
	if (mine) {
		p.className = "message mine";
		name = "You";
	} else {
		p.className = "message";
	}

	p.innerHTML = `<span>${name}</span><p>${data.message}</p>`;
	p.id = new Date().getTime();
	messages.append(p);
	document.getElementById(p.id).scrollIntoView();
}

const messages = document.getElementById("messages");
const input = document.getElementsByTagName("input")[0];

newUserMessage("You");

document.getElementsByTagName("form")[0].addEventListener("submit", (event) => {
	event.preventDefault();
	// console.log('Clicked button')
	const message = input.value;
	if (!message) return;
	newMessage({ message }, true);
	// Let others know I have written a message
	socket.emit("newMessage", {
		user: userName,
		message,
	});

	input.value = "";
});

window.onbeforeunload = (event) => {
	return "Are you sure you want to leave?";
};
