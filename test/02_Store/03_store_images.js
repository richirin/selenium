const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const settings = require('../../helpers/settings');

describe('Store Images', () => {
	const { config } = settings;
	let driver;

	before(async () => {
		driver = await settings.page();
	});
	after(async () => {
		await driver.quit();
	});

	it('should Redirect to Store detail Page, when i click Back Button', async () => {
		// Go to Store Images
		await driver.get(`${config.baseUrl}/store-images/64`);
		// Get Store Name Store Images
		const storeImagesName = await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.xpath('//p[@class=\'navbar-page-title\']'))), config.inputSearch), config.timeout).getText();
		// Click Back Button
		await driver.wait(until.elementLocated(By.id('nav-button-back')), config.timeout).click();
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.include('store-detail');
		// Verify Store Name
		const storeDetailName = await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name\']'))), config.inputSearch), config.timeout).getText();
		expect(storeDetailName).to.equal(storeImagesName);
	});
});
