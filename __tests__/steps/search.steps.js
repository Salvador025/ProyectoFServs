const { defineFeature, loadFeature } = require("jest-cucumber");
const webdriver = require("selenium-webdriver");
const path = require("path");

const feature = loadFeature(
	path.resolve(__dirname, "../features/search.feature")
);

defineFeature(feature, (test) => {
	test('Searching for "Carreras" on ITESO', ({ given, when, then }) => {
		let driver;
		beforeAll(async () => {
			driver = new webdriver.Builder()
				.forBrowser(webdriver.Browser.EDGE)
				.build();
		});
		given("I am on the ITESO homepage", async () => {
			await driver.get("https://iteso.mx");
		});

		when(/^I search for "(.*)"$/, async (arg0) => {
			await driver.findElement(webdriver.By.id("icon-search")).click();
			await driver.findElement(webdriver.By.id("ipt-search")).sendKeys(arg0);
		});

		then("I should see the search results", async () => {
			const title = await driver.getTitle();
			expect(title).toContain("Home");
		});
		afterAll(() => {
			driver.quit();
		});
	}, 10000);
});
