import { Server as HttpServer } from "node:http";
import { Server as IOServer, Socket } from "socket.io";

function initializeSocket(server: HttpServer) {
	const io = new IOServer(server);

	io.on("connection", (socket: Socket) => {
		console.log("A new user connected");

		// Let others know that you joined
		socket.on("newUser", (data: { user: string }) => {
			socket.data.user = data.user; // Save the data for when the user disconnects
			socket.broadcast.emit("newUser", data);
		});

		socket.on("newMessage", (data: { message: string; sender: string }) => {
			socket.broadcast.emit("newMessage", data);
		});

		socket.on("disconnect", () => {
			socket.broadcast.emit("userLeft", { ...socket.data });
		});
	});
}

export default initializeSocket;
