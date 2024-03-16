import crypto from "crypto";

export default (password: string): string => {
	password = password ?? "";
	const hash = crypto.scryptSync(password, process.env.SECRET_KEY, 24);
	return hash.toString("hex");
};
