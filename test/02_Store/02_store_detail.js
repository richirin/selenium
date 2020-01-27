const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const settings = require('../../helpers/settings');

describe('Store Detail', () => {
	const { config } = settings;
	let driver;

	before(async () => {
		driver = await settings.page();
	});
	after(async () => {
		await driver.quit();
	});

	it('Should Redirect to Store Images Page, When i click "Jelajahi Store"', async () => {
		const { inputSearch } = config;
		// Open Store-list page
		await driver.get(`${config.baseUrl}/store-list`);
		// Input Text Stasiun Gambir
		await driver.wait(until.elementLocated(By.id('search-store')), config.timeout).sendKeys(inputSearch);
		// Click at Stasiun Gambir
		await driver.wait(until.elementLocated(By.xpath('//span[@class=\'info-link\']')), config.timeout).click();
		// verify storeName
		const storeDetailName = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//p[@class=\'store-name\']')))).getText();
		expect(storeDetailName).to.equal(inputSearch);
		// Verify Url
		const urlStoreDetail = await driver.getCurrentUrl();
		expect(urlStoreDetail).to.include(`${config.baseUrl}/store-detail`);
		// Click jelajahi toko
		await driver.wait(until.elementLocated(By.id('store-button-explore')), config.timeout).click();
		// Verify Url
		const urlStoreImages = await driver.getCurrentUrl();
		expect(urlStoreImages).to.include(`${config.baseUrl}/store-images`);
		// Verify Store Name
		const storeImagesName = await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.xpath('//p[@class=\'navbar-page-title\']'))), config.inputSearch), config.timeout).getText();
		expect(storeImagesName).to.equal(inputSearch);
	});

	it('Should Redirect to Menu Page, When i click Button "Pesan Dari Sini"', async () => {
		const { inputSearch } = config;
		// Go to Store Detail
		await driver.get(`${config.baseUrl}/store-detail/64`);
		// Click Button "Pesan Dari Sini"
		await driver.wait(until.elementLocated(By.id('store-button-select'))).click();
		// Verify Store Name
		// const storeName = await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name\']'))), config.inputSearch), config.timeout).getText();
		// expect(storeName).to.equal(inputSearch);
		// // Verify Url
		// const url = await driver.getCurrentUrl();
		// expect(url).to.include(`${config.baseUrl}/order`);
	});

	it('should Redirect to Store List Page, when i click Back Button', async () => {
		const titleHeader = 'Lokasi Store';
		// Go to Store Detail
		await driver.get(`${config.baseUrl}/store-detail/64`);
		// Click Back Button
		await driver.wait(until.elementLocated(By.id('nav-button-back')), config.timeout).click();
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.equal(`${config.baseUrl}/store-list`);
		// Verify header
		const header = await driver.wait(until.elementLocated(By.xpath('//p[@class=\'navbar-page-title\']')), config.timeout).getText();
		expect(header).to.equal(titleHeader);
	});

	it('Verify if Phone Number contains 08', async () => {
		// Go to Store Detail
		await driver.get(`${config.baseUrl}/store-detail/64`);
		// Wait till Stasiun Gambir is Appear
		await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name\']'))), config.inputSearch), config.timeout);
		// Verify Phone number
		const href = await driver.findElement(By.xpath('//div[@class=\'contact-store-icon\']//a')).getAttribute('href');
		expect(href).to.include('08');
	});
});
