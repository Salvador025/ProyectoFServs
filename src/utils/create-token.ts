import jwt from "jsonwebtoken";
import { InputToken, DecodedToken } from "../types";

export function code(data: InputToken): string {
	return jwt.sign(data, process.env.TOKEN_KEY);
}

export function decode(token: string): DecodedToken | null {
	try {
		return jwt.verify(token, process.env.TOKEN_KEY);
	} catch (error) {
		return null;
	}
}
