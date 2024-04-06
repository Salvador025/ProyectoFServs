export type InputToken = {
	name: string;
	email: string;
};

interface DecodedToken {
	email: string;
	iat: number;
	name: string;
}
