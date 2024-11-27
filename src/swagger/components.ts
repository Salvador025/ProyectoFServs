// components.ts
export const components = {
	schemas: {
		User: {
			type: "object",
			required: ["name", "email", "username", "password"],
			properties: {
				name: {
					type: "string",
					example: "John Doe",
				},
				email: {
					type: "string",
					format: "email",
				},
				username: {
					type: "string",
					example: "JohnDoe",
				},
				password: {
					type: "string",
					example: "JohnDoe",
				},
			},
		},
	},
};
