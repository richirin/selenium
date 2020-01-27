const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const settings = require('./settings');

const setting = settings.config;

const goToStoreDetail = async (driver) => {
	const inputSearch = 'Stasiun Gambir';
	// Open Store-list page
	await driver.get(`${setting.baseUrl}/store-list`);
	// Input Text Stasiun Gambir
	await driver.wait(until.elementLocated(By.id('search-store')), setting.timeout).sendKeys(inputSearch);
	// Click at Stasiun Gambir
	await driver.wait(until.elementLocated(By.xpath('//span[@class=\'info-link\']')), setting.timeout).click();
	// Wait untill Button "Pesan dari sini" appear
	// Verify Url
	const url = await driver.getCurrentUrl();
	expect(url).to.include('store-detail');
	// Verify Store Name
	const storeName = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//p[@class=\'store-name\']')))).getText();
	// const storeName = await driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name\']'))), setting.timeout)).getText();
	expect(storeName).to.equal(inputSearch);
};

const goToStoreImages = async (driver) => {
	const inputSearch = 'Stasiun Gambir';
	// Open Store-list page
	await driver.get(`${setting.baseUrl}/store-list`);
	// Input Text Stasiun Gambir
	await driver.wait(until.elementLocated(By.id('search-store')), setting.timeout).sendKeys(inputSearch);
	// Click at Stasiun Gambir
	await driver.wait(until.elementLocated(By.xpath('//span[@class=\'info-link\']')), setting.timeout).click();
	// Wait untill Button "Pesan dari sini" appear
	// Verify Url
	const url = await driver.getCurrentUrl();
	expect(url).to.include('store-detail');
	// Verify Store Name
	const storeName = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//p[@class=\'store-name\']')))).getText();
	// const storeName = await driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name\']'))), setting.timeout)).getText();
	expect(storeName).to.equal(inputSearch);
	// Click Button "Jelajahi Toko"
	await driver.wait(until.elementLocated(By.id('store-button-explore')), setting.timeout).click();
};

module.exports = {
	goToStoreDetail,
	goToStoreImages,
};
