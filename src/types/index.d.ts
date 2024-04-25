import { Request } from "express";
import Roles from "./roles";
import { Profile } from "passport-google-oauth20";

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
}

export interface UserToken extends Profile {
	token: string;
}

export interface RequestUser extends Request {
	user?: User;
}

declare global {
	function consoleLog(msg: string): void;
	function consoleError(msg: Error | string): void;
}
