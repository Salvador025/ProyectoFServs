import { Server as HttpServer } from "node:http";
import { Server as IOServer } from "socket.io";
import { Room, SocketUser } from "../types";
import { decode } from "../utils/create-token";

const rooms: { [id: string]: Room } = {};

function initializeSocket(server: HttpServer) {
	const io = new IOServer(server, { cors: { origin: "*" } });

	io.use((socket: SocketUser, next) => {
		const token = socket.handshake.auth?.token;
		if (token) {
			const username = decode(token);
			if (username) {
				socket.username = username as string;
				next();
			} else {
				consoleError("Invalid token");
				next(new Error("Invalid token"));
			}
		} else {
			consoleError("Token is required");
			next(new Error("Token is required"));
		}
	});

	io.on("connection", (socket: SocketUser) => {
		// Let others know that you joined
		socket.on("newUser", (data: { user: string }) => {
			socket.data.user = data.user; // Save the data for when the user disconnects
			socket.broadcast.emit("newUser", data);
		});

		socket.on("newMessage", (data: { message: string; sender: string }) => {
			socket.broadcast.emit("newMessage", data);
		});

		// socket.on("disconnect", () => {
		// 	socket.broadcast.emit("userLeft", { ...socket.data });
		// });

		// Handle joining a room
		socket.on("createOrJoinRoom", () => {
			let partyId = null;

			// Find an available room or create a new one
			for (const id in rooms) {
				if (rooms[id].players.length < 2) {
					partyId = id;
					break;
				}
			}

			if (!partyId) {
				partyId = `room-${Math.random().toString(36).substring(2, 11)}`;
				rooms[partyId] = {
					players: [],
					turn: 1,
				};
			}

			const room = rooms[partyId];

			if (room.players.length < 2) {
				const playerNumber = room.players.length + 1;
				room.players.push({
					id: socket.id,
					username: socket.username,
					playerNumber,
				});
				socket.join(partyId);

				socket.emit("joinedRoom", { partyId, playerNumber });
				socket.emit(
					"waiting",
					room.players.length === 1
						? "Waiting for another player..."
						: "Game starting soon...",
				);

				if (room.players.length === 2) {
					io.to(partyId).emit("gameStart", {
						partyId,
						turn: room.turn,
					});
				}
			} else {
				socket.emit("error", "Room is full");
			}
		});

		// Handle piece movement
		socket.on("movePiece", ({ partyId, piece, targetCell, isCapturing }) => {
			const room = rooms[partyId];
			if (!room) {
				socket.emit("error", "Room not found");
				return;
			}

			const player = room.players.find((p) => p.id === socket.id);
			if (!player) {
				socket.emit("error", "You are not part of this room");
				return;
			}

			if (room.turn !== player.playerNumber) {
				socket.emit("error", "Not your turn");
				return;
			}

			if (!isCapturing) {
				room.turn = room.turn === 1 ? 2 : 1;
			}

			const otherPlayer = room.players.find((p) => p.id !== socket.id);
			if (!otherPlayer) {
				socket.emit("error", "Other player not found");
				return;
			}

			io.to(otherPlayer.id).emit("updateBoard", {
				piece,
				targetCell,
				turn: room.turn,
			});
		});

		socket.on("invalidMove", (partyId) => {
			const room = rooms[partyId];
			if (room) {
				const otherPlayer = room.players.find((p) => p.id !== socket.id);
				if (otherPlayer) {
					io.to(otherPlayer.id).emit("invalidMove");
				}
			}
		});

		socket.on("exitRoom", (partyId) => {
			try {
				socket.leave(partyId);

				const room = rooms[partyId];
				console.log(`party id exitRoom-${partyId}:`);
				console.log(`room on exitRoom-${socket.id}:`, room);
				if (room && !!room.players) {
					console.log("room players: ", room.players);
					const otherPlayer = room.players.find((p) => p.id !== socket.id);
					if (otherPlayer) {
						delete rooms[partyId];
						console.log("rooms: ", rooms);
						io.to(otherPlayer.id).emit(
							"playerDisconnected",
							"Other player disconnected. You win!",
						);
					}
				}
			} catch (error) {
				console.error("Error exiting room: ", error);
			}
		});

		// Handle player disconnect
		socket.on("disconnect", () => {
			for (const partyId in rooms) {
				const room = rooms[partyId];
				if (!room) {
					continue;
				}
				room.players = room.players.filter((p) => p.id !== socket.id);

				if (room.players.length === 0) {
					delete rooms[partyId];
				} else {
					io.to(partyId).emit(
						"playerDisconnected",
						"Other player disconnected. You win!",
					);
				}
			}
		});
	});
}

export default initializeSocket;
