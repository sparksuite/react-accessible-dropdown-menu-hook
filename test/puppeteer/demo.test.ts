// Imports
import path from 'path';

// Destructured constant for readability
const { keyboard } = page;

// Helper functions used in multiple tests
const currentFocusID = () => page.evaluate(() => document.activeElement.id);
const menuOpen = () => page.waitForSelector('#menu', { visible: true });
const menuClosed = () => page.waitForSelector('#menu', { hidden: true });

// Tests
beforeEach(async () => {
	await page.goto(`file://${path.join(__dirname, '..', '..', 'demo', 'build', 'index.html')}`, {
		waitUntil: 'load',
	});
});

it('has the correct page title', async () => {
	await expect(page.title()).resolves.toMatch('React Accessible Dropdown Menu Hook');
});

it('focuses on the first menu item when the enter key is pressed', async () => {
	await page.focus('#menu-button');
	await keyboard.down('Enter');
	await menuOpen();

	expect(await currentFocusID()).toBe('menu-item-1');
});

it('focuses on the menu button after pressing escape', async () => {
	await page.click('#menu-button');
	await menuOpen();

	await keyboard.down('Escape');
	await menuClosed();

	expect(await currentFocusID()).toBe('menu-button');
});

it('focuses on the next item in the tab order after pressing tab', async () => {
	await page.click('#menu-button');
	await menuOpen();

	await keyboard.down('Tab');
	await menuClosed();

	expect(await currentFocusID()).toBe('first-footer-link');
});

it('focuses on the previous item in the tab order after pressing shift-tab', async () => {
	await page.click('#menu-button');
	await menuOpen();

	await keyboard.down('Shift');
	await keyboard.down('Tab');
	await menuClosed();

	expect(await currentFocusID()).toBe('menu-button');
});

it('closes the menu if you click outside of it', async () => {
	await page.click('#menu-button');
	await menuOpen();

	await page.click('body');
	await menuClosed(); // times out if menu doesn't close

	expect(true).toBe(true);
});

it('leaves the menu open if you click inside of it', async () => {
	await page.click('#menu-button');
	await menuOpen();

	await page.click('#menu-item-1');
	await new Promise(resolve => setTimeout(resolve, 1000)); // visibility: hidden is delayed via CSS
	await menuOpen(); // times out if menu closes

	await page.click('#menu');
	await new Promise(resolve => setTimeout(resolve, 1000)); // visibility: hidden is delayed via CSS
	await menuOpen(); // times out if menu closes

	expect(true).toBe(true);
});

it('reroutes enter presses on menu items as clicks', async () => {
	let alertAppeared = false;

	await page.click('#menu-button');
	await menuOpen();

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	page.on('dialog', async dialog => {
		alertAppeared = true;
		await dialog.dismiss();
	});

	await page.focus('#menu-item-3');
	await keyboard.down('Enter');

	expect(alertAppeared).toBe(true);
});
