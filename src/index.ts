import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(routes);

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
