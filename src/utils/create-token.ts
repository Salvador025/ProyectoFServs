import jwt from "jsonwebtoken";
import { inputToken } from "../types";

export function code(data: inputToken): string {
	return jwt.sign(data, process.env.TOKEN_KEY);
}

export function decode(token: string): inputToken | null {
	try {
		return jwt.verify(token, process.env.TOKEN_KEY);
	} catch (error) {
		return null;
	}
}
