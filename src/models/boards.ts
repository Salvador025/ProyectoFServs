import { Schema, model } from "mongoose";

const boardsSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	direction: {
		type: String,
		required: true,
	},
});

export default model("users", boardsSchema);
