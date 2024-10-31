import dotenv from "dotenv";
import express from "express";
dotenv.config();
import path from "node:path";
import cors from "cors";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./../swagger.config";
import { googleAuth } from "./middlewares/google-auth";
import socketIo from "./middlewares/socket.io";
import routes from "./routes";
import setUpLogs from "./utils/logs";
setUpLogs();

const app = express();

const port = process.env.PORT || 4000;
app.use(cors());
app.engine(
	"handlebars",
	engine({
		layoutsDir: "./src/views/layouts/",
		partialsDir: ["./src/views/partials/"],
	}),
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.json());
googleAuth(app);
app.use("/assets", express.static(path.join(__dirname, "../public")));
app.use(routes);

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function start() {
	const db_url = process.env.DB_IRL;
	try {
		await mongoose.connect(db_url);
		console.log("Connected to db");
		if (process.env.NODE_ENV === "dev") {
			app.use("/assets", express.static(path.join(__dirname, "../public")));
		} else {
			app.use("/assets", express.static(path.join(__dirname, "../../public")));
		}
		const server = app.listen(port, () => {
			if (process.env.NODE_ENV === "dev") {
				consoleLog(`Server running on port ${port}`);
			} else {
				console.log("Server running");
			}
		});
		socketIo(server);
	} catch (error) {
		consoleError("Failed to connect to db");
		process.exit(1);
	}
}

start();
