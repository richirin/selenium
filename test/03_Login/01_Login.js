const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const settings = require('../../helpers/settings');

// config.js -> settings.js
// input search di dalan it
// after dan before format sama
describe('Store List', () => {
	const { config } = settings;
	let driver;

	before(async () => {
		driver = await settings.page();
	});
	after(async () => {
		await driver.quit();
	});

	it('Successfully Login', async () => {
		const text = 'Masuk / Daftar';
		// Open Home page
		await driver.get(`${config.baseUrl}/home`);
		// Click At Menu Bar
		await driver.wait(until.elementLocated(By.id('menu-area')), config.timeout).click();
		// Verify Text is Visible
		const loginOrRegister = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//p[@class=\'text-1\']')))).getText();
		expect(loginOrRegister).to.equal(text);
		// Input Phone Number
		await driver.wait(until.elementLocated(By.id('input-daftar')), config.timeout).sendKeys(config.phoneNumber);
		// Click Button "Lanjut"
		await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),\'Lanjut\')]')), config.timeout).click();
		// Verify url
		const urlInputOtp = await driver.getCurrentUrl();
		expect(urlInputOtp).to.contain('register-otp');
		// Input OTP
		await driver.sleep(2000);
		await driver.wait(until.elementLocated(By.id('register-otp-code')), config.timeout).sendKeys(config.otpNumber);
		// Verify Element
		const hello = await driver.wait(until.elementLocated(By.xpath('//p[@class=\'account-name\']')), config.timeout).getText();
		console.log(hello);
		expect(hello).to.contain('Hello');
		// Verify url
		const urlAfterLogin = await driver.getCurrentUrl();
		console.log(urlAfterLogin);
		// expect(urlAfterLogin).to.contain('account-view');
	});
});
