export default function logs() {
	global.consoleLog = (message: string) => {
		const validEnvs = ["dev", "test", "local"];
		const env = process.env.NODE_ENV;

		if (validEnvs.includes(env)) {
			console.log(message);
		}
	};

	global.consoleError = (message: Error | string) => {
		const validEnvs = ["dev", "production", "local"];
		const env = process.env.NODE_ENV;

		const outputMessage = message instanceof Error ? message.message : message;

		if (validEnvs.includes(env)) {
			console.error(outputMessage);
		} else if (env === "test") {
			console.log(outputMessage);
		}
	};
}
