import { defineFeature, loadFeature } from "jest-cucumber";
import webdriver from "selenium-webdriver";
import path from "path";

const feature = loadFeature(
	path.resolve(__dirname, "../features/singUp.feature"),
);

defineFeature(feature, (test) => {
	let driver: webdriver.ThenableWebDriver;
	beforeAll(async () => {
		driver = new webdriver.Builder().forBrowser("chrome").build();
	});
	test("Successful sign up", ({ given, when, and, then }) => {
		given(/^I am on the page "(.*)"$/, async (arg0) => {
			await driver.get(arg0);
		});

		when("I click on the sign Up button", async () => {
			await driver.findElement(webdriver.By.id("signUpButton")).click();
		});

		and("I enter a username in the username field", async () => {
			await driver
				.findElement(webdriver.By.id("username_singUp"))
				.sendKeys("username");
		});

		and("I enter my name in the name field", async () => {
			await driver.findElement(webdriver.By.id("name_singUp")).sendKeys("name");
		});

		and("I enter an email in the email field", async () => {
			await driver
				.findElement(webdriver.By.id("email_singUp"))
				.sendKeys("email@email.com");
		});

		and("I enter a password in the password field", async () => {
			await driver
				.findElement(webdriver.By.id("password_singUp"))
				.sendKeys("password");
		});

		and("I press enter", async () => {
			await driver
				.findElement(webdriver.By.id("password_singUp"))
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
