require('dotenv').config();
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const {
	Builder, Key, By, until,
} = require('selenium-webdriver');

const o = new chrome.Options();
o.addArguments(
	process.env.HEADLESS,
	process.env.DISABLE_INFO_BARS,
	process.env.DISBLE_LOG,
);
const page = () => {
	const driver = new Builder()
		.setChromeOptions(o)
		.forBrowser('chrome')
		.build();
	driver
		.manage()
		.window()
		.setSize(parseInt(process.env.WIDTH), parseInt(process.env.HEIGHT));
	return driver;
};

const config = {
	timeout: parseInt(process.env.TIMEOUT),
	baseUrl: String(process.env.BASE_URL),
	phoneNumber: String(process.env.PHONE_NUMBER),
	otpNumber: String(process.env.OTP_NUMBER),
	inputSearch: String(process.env.INPUT_SEARCH),
	url: String(process.env.URL),
};

module.exports = {
	page,
	config,
};
