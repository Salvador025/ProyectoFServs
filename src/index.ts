import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routes from "./routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { googleAuth } from "./middlewares/google-auth";

const app = express();

const port = process.env.PORT || 4000;

import { swaggerConfig } from "./../swagger.config";

app.use(express.json());
googleAuth(app);
app.use(routes);

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function start() {
	const db_url = process.env.DB_IRL;
	try {
		await mongoose.connect(db_url);
		console.log("Connected to db");
		app.listen(port, () => {
			if (process.env.NODE_ENV === "dev") {
				console.log(`Server running on port ${port}`);
			} else {
				console.log(`Server running`);
			}
		});
	} catch (error) {
		console.log("Error connecting to db", error);
	}
}

start();
