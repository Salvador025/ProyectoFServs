import { Request } from "express";
export type InputToken = {
	name: string;
	email: string;
};

export interface DecodedToken {
	email: string;
	iat: number;
	name: string;
}

export interface User {
	name: string;
	password: string;
	email: string;
	role: string;
}

export interface RequestUser extends Request {
	user?: User;
}
