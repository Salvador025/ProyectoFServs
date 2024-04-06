export const swaggerConfig = {
	swaggerDefinition: {
		openapi: "3.1.0",
		info: {
			version: "1.0.0",
			description: "Swagger API",
			title: "Swagger API",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Local server",
			},
		],
	},
	apis: ["src/**/*.ts"],
};
