import { Request } from "express";
import Roles from "./roles";

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
	role: Roles;
}

export interface RequestUser extends Request {
	user?: User;
}
