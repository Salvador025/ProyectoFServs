import crypto from "node:crypto";

export default (password: string): string => {
	const valid_password = password ?? "";
	const hash = crypto.scryptSync(valid_password, process.env.SECRET_KEY, 24);
	return hash.toString("hex");
};
