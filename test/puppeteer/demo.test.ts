// Imports
import path from 'path';

// Helper functions used in multiple tests
const currentFocusID = () => page.evaluate(() => document.activeElement.id);
const menuOpen = () => page.waitForSelector('#menu', { visible: true });
const menuClosed = () => page.waitForSelector('#menu', { hidden: true });

// Tests
beforeEach(async () => {
	await jestPuppeteer.resetPage();

	await page.goto(`file://${path.join(__dirname, '..', '..', 'demo', 'build', 'index.html')}`, {
		waitUntil: 'load',
	});
});

it('has the correct page title', async () => {
	await expect(page.title()).resolves.toMatch('React Accessible Dropdown Menu Hook');
});

it('leaves focus on the button after clicking it', async () => {
	await page.click('#menu-button');
	await menuOpen();

	expect(await currentFocusID()).toBe('menu-button');
});

it('focuses on the menu button after pressing escape', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.keyboard.down('Escape');
	await menuClosed();

	expect(await currentFocusID()).toBe('menu-button');
});

it('focuses on the next item in the tab order after pressing tab', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.keyboard.down('Tab');
	await menuClosed();

	expect(await currentFocusID()).toBe('first-footer-link');
});

it('focuses on the previous item in the tab order after pressing shift-tab', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.keyboard.down('Shift');
	await page.keyboard.down('Tab');
	await menuClosed();

	expect(await currentFocusID()).toBe('menu-button');
});

it('closes the menu if you click outside of it', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.click('h1');
	await menuClosed(); // times out if menu doesn't close

	expect(true).toBe(true);
});

it('leaves the menu open if you click inside of it', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	page.once('dialog', async (dialog) => {
		await dialog.dismiss();
	});

	await page.click('#menu-item-3');
	await new Promise((resolve) => setTimeout(resolve, 1000)); // visibility: hidden is delayed via CSS
	await menuOpen(); // times out if menu closes

	const { xOffset, yOffset } = await page.evaluate((el: HTMLElement) => {
		const { left: xOffset, top: yOffset } = el.getBoundingClientRect();
		return { xOffset, yOffset };
	}, await page.$('#menu'));

	await page.mouse.click(xOffset + 2, yOffset + 2); // Click just inside the top left corner (`page.click()` clicks the center, which is a link to NPM)
	await new Promise((resolve) => setTimeout(resolve, 1000)); // visibility: hidden is delayed via CSS
	await menuOpen(); // times out if menu closes

	expect(true).toBe(true);
});

it('reroutes enter presses on menu items as clicks', async () => {
	let alertAppeared = false;

	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	page.once('dialog', async (dialog) => {
		alertAppeared = true;
		await dialog.dismiss();
	});

	await page.focus('#menu-item-3');
	await page.keyboard.down('Enter');

	expect(alertAppeared).toBe(true);
});
