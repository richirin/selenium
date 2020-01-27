const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const settings = require('../../helpers/settings');

// config.js -> settings.js
// input search di dalan it
// after dan before format sama
describe('Store List', () => {
	const { config } = settings; // config
	let driver;

	before(async () => {
		driver = await settings.page();
	});
	after(async () => {
		await driver.quit();
	});

	it('Search Result Should Match with Search Input', async () => {
		const inputSearch = 'Stasiun Gambir';
		// Open Store-list page
		await driver.get(`${config.baseUrl}/store-list`);
		// Input Text Stasiun Gambir
		await driver.wait(until.elementLocated(By.id('search-store')), config.timeout).sendKeys(inputSearch);
		// Verify Search Result Match with Search Input
		const resultMatch = await driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name color-dark-grey\']')), config.timeout).getText();
		expect(resultMatch).to.equal(inputSearch);
	});

	it('Should Redirect to Store Detail Page, When i choose Store', async () => {
		const inputSearch = 'Stasiun Gambir';
		// Open Store-list page
		await driver.get(`${config.baseUrl}/store-list`);
		// Input Text Stasiun Gambir
		await driver.wait(until.elementLocated(By.id('search-store')), config.timeout).sendKeys(inputSearch);
		// Click at Stasiun Gambir
		await driver.wait(until.elementLocated(By.id('store-detail')), config.timeout).click();
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.include(`${config.baseUrl}/store-detail`);
		// Verify Store Name
		const storeName = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//p[@class=\'store-name\']')))).getText();
		expect(storeName).to.equal(inputSearch);
	});

	it('Redirect to Menu Page, when i click Store Info', async () => {
		const inputSearch = 'Stasiun Gambir';
		await driver.get(`${config.baseUrl}/store-list`);
		// Input Text Stasiun Gambir
		await driver.wait(until.elementLocated(By.id('search-store')), config.timeout).sendKeys(inputSearch);
		// Click at Stasiun Gambir
		await driver.wait(until.elementLocated(By.id('store-select')), config.timeout).click();
		// Verify Store Location
		const storeName = await driver.wait(until.elementLocated(By.xpath('//p[@class=\'address-label\']')), config.timeout).getText();
		expect(storeName).to.equal(inputSearch);
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.include(`${config.baseUrl}/order`);
	});

	it('Should redirect to Home page when i click back button', async () => {
		// Open Store-list page
		await driver.get(`${config.baseUrl}/store-list`);
		// Click Back Button
		await driver.wait(until.elementLocated(By.id('nav-button-back')), config.timeout).click();
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.equal(`${config.baseUrl}/home`);
	});
});
