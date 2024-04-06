import { Schema, model } from "mongoose";

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["admin", "user", "creator"],
		default: "user",
	},
});

export default model("User", schema);
