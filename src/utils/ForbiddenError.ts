export default class ForbiddenError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}
