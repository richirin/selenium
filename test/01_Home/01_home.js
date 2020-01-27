const { By, until } = require('selenium-webdriver');
const { assert, expect, should } = require('chai');
const settings = require('../../helpers/settings');

describe('Homepage', () => {
	const { config } = settings; // config
	let driver;

	before(async () => {
		driver = await settings.page();
	});
	after(async () => {
		await driver.quit();
	});

	it('Should open Store List, When I click "Pilih Store"', async () => {
		const titleHeader = 'Lokasi Store';
		// Open Homepage Fore
		await driver.get(`${config.baseUrl}/home`);
		// Click "Pilih Store"
		await driver.wait(until.elementLocated(By.id('home-select-store')), config.timeout).click();
		// Verify URL
		const url = await driver.getCurrentUrl();
		expect(url).to.equal(`${config.baseUrl}/store-list`);
		// Verify element
		const header = await driver.wait(until.elementLocated(By.xpath('//p[@class=\'navbar-page-title\']')), config.timeout).getText();
		expect(header).to.equal(titleHeader);
		// Click Back
		await driver.wait(until.elementLocated(By.id('nav-button-back')), config.timeout).click();
	});

	it('Should open Store List, When I click Pen Icon', async () => {
		// Open Homepage Fore
		await driver.get(`${config.baseUrl}/home`);
		// Click "Pen Icon"
		await driver.wait(until.elementLocated(By.id('home-button-edit')), config.timeout).click();
		// Verify URL
		const url = await driver.getCurrentUrl();
		expect(url).to.equal(`${config.baseUrl}/store-list`);
		// Click Back
		await driver.wait(until.elementLocated(By.id('nav-button-back')), config.timeout).click();
	});

	it('Show Pop Up Error(Oops), When i Click See Menu without Choose Store', async () => {
		const oops = 'OOPPSS...';
		// Open Homepage Fore
		await driver.get(`${config.baseUrl}/home`);
		// Click "Pilih Menu"
		await driver.wait(until.elementLocated(By.id('home-button-menu')), config.timeout).click();
		// Verify Pop Up Oops is Visible
		const popUp = await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.xpath('//p[@class=\'store-name\']'))), oops), config.timeout).getText();
		expect(popUp).to.equal(oops);
		// Click Oke, should close the pop up
		await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),\'OKE\')]')), config.timeout).click();
		// Verify pop up has closed
		await driver.wait(until.elementLocated(By.xpath('//p[@class=\'text-download color-green\']')), config.timeout);
	});

	it('Should Redirect to Play Store, When i click image Downlod Get It On Google Play', async () => {
		// Open Homepage Fore
		await driver.get(`${config.baseUrl}/home`);
		// Click "Pilih Menu"
		await driver.wait(until.elementLocated(By.xpath('//img[@class=\'icon-google\']')), config.timeout).click();
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.include('fore');
	});

	it('Should Redirect to Play Store, When i click image Downlod Get It On Google Play', async () => {
		// Open Homepage Fore
		await driver.get(`${config.baseUrl}/home`);
		// Click "Pilih Menu"
		await driver.wait(until.elementLocated(By.xpath('//img[@class=\'icon-apple\']')), config.timeout).click();
		// Verify Url
		const url = await driver.getCurrentUrl();
		expect(url).to.include('fore');
	});
});
