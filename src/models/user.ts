import { Schema, model } from "mongoose";
import Roles from "../types/roles";

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		required: true,
		enum: Object.values(Roles),
		default: "user",
	},
});

export default model("User", schema);
