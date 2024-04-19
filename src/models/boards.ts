import { Schema, model } from "mongoose";

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	owner: {
		type: String,
		required: true,
	},
	direction: {
		type: String,
		required: true,
	},
});

export default model("board", schema);
