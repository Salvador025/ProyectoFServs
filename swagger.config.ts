import { components } from "./src/swagger/components";
// swagger.config.ts
import { paths } from "./src/swagger/paths";

export const swaggerConfig = {
	openapi: "3.1.0",
	info: {
		version: "1.0.0",
		description: "Documentación de la API",
		title: "API",
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Servidor local",
		},
	],
	paths: paths,
	components: components,
};
