import setUpLogs from "../../src/utils/logs";
setUpLogs();

describe("pass", () => {
	test("should pass", () => {
		expect(true).toBe(true);
	});
});
