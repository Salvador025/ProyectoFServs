import { defineFeature, loadFeature } from "jest-cucumber";
import webdriver from "selenium-webdriver";
import path from "path";

const feature = loadFeature(
	path.resolve(__dirname, "../features/logIn.feature"),
);

defineFeature(feature, (test) => {
	let driver: webdriver.ThenableWebDriver;
	beforeAll(async () => {
		driver = new webdriver.Builder().forBrowser("chrome").build();
	});
	test("Successful login", ({ given, when, and, then }) => {
		given(/^I am on the page "(.*)"$/, async (arg0) => {
			await driver.get(arg0);
		});

		when(/^I click on the "(.*)" button$/, async (arg0) => {
			await driver.findElement(webdriver.By.id(arg0)).click();
			await driver.wait(
				webdriver.until.elementIsVisible(
					driver.findElement(webdriver.By.id("logIn")),
				),
			);
		});

		and(/^I enter the email "(.*)" in the email field$/, async (arg0) => {
			await driver.findElement(webdriver.By.id("email_logIn")).sendKeys(arg0);
		});

		and(/^I enter the password "(.*)" in the password field$/, async (arg0) => {
			await driver
				.findElement(webdriver.By.id("password_logIn"))
				.sendKeys(arg0);
		});

		and("I press Enter", async () => {
			await driver
				.findElement(webdriver.By.id("password_logIn"))
				.sendKeys(webdriver.Key.ENTER);
		});

		then(/^I should be redirected to "(.*)"$/, async (arg0) => {
			await driver.wait(webdriver.until.urlContains(arg0), 1000);
		});
	});

	afterAll(async () => {
		await driver.quit();
	});
});
