import { Request } from "express";
import { Profile } from "passport-google-oauth20";
import { Socket } from "socket.io";
import Roles from "./roles";

export type InputToken = {
	name: string;
	email: string;
};

export interface User {
	name: string;
	username: string;
	password?: string;
	email: string;
	role: Roles;
	image?: string;
}

export interface Boards {
	name: string;
	owner: string;
	direction: string;
	description: string;
}

export interface UserToken extends Profile {
	token: string;
}

export interface RequestUser extends Request {
	user?: User;
}

export interface SocketUser extends Socket {
	username: string;
}

export interface Player {
	id: string;
	username: string;
	playerNumber: number;
}

export interface Room {
	players: Player[];
	turn: number;
}

declare global {
	// biome-ignore lint/suspicious/noExplicitAny: <this function is used to log any type of message>
	function consoleLog(msg: any): void;
	function consoleError(msg: Error | string): void;
}
