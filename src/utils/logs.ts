export default function logs() {
	// biome-ignore lint/suspicious/noExplicitAny: <this function is used to log any type of message>
	global.consoleLog = (message: any) => {
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
			if (outputMessage === "Generic error") return;
			console.log(outputMessage);
		}
	};
}
