import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import { engine } from "express-handlebars";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./../swagger.config";
import { googleAuth } from "./middlewares/google-auth";
import setUpLogs from "./utils/logs";
import socketIo from "./middlewares/socket.io";
import routes from "./routes";
setUpLogs();

const app = express();

const port = process.env.PORT || 4000;

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
		const server = app.listen(port, () => {
			if (process.env.NODE_ENV === "dev") {
				consoleLog(`Server running on port ${port}`);
			} else {
				console.log(`Server running`);
			}
		});
		socketIo(server);
	} catch (error) {
		consoleError("Failed to connect to db");
		process.exit(1);
	}
}

start();
