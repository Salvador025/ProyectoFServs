export default class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}
