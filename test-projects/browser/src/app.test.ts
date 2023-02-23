// Imports
import path from 'path';
import { ElementHandle, Page } from 'puppeteer';

// Helper functions used in multiple tests
const currentFocusID = (): Promise<string | undefined> => page.evaluate(() => document.activeElement?.id);
const menuOpen = (): Promise<ElementHandle<Element> | null> => page.waitForSelector('#menu', { visible: true });
const menuClosed = (): Promise<ElementHandle<Element> | null> => page.waitForSelector('#menu', { hidden: true });
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const menuIsOpen = async (page: Page): Promise<boolean> =>
	await page.evaluate(() => {
		const element = document.querySelector('#menu');

		if (!element) {
			throw new Error('Missing element');
		}

		const style = getComputedStyle(element);
		const rect = element.getBoundingClientRect();

		return style.visibility !== 'hidden' && Boolean(rect.bottom || rect.top || rect.height || rect.width);
	});

// Tests
beforeEach(async () => {
	await jestPuppeteer.resetPage();

	await page.goto(`file://${path.join(__dirname, '..', 'build', 'index.html')}`, {
		waitUntil: 'load',
	});
});

it('Has the correct page title', async () => {
	await expect(page.title()).resolves.toMatch('Browser');
});

it('Maintains focus when menu button is clicked', async () => {
	await page.click('#menu-button');
	await menuOpen();

	expect(await currentFocusID()).toBe('menu-button');
});

it('Focuses on the menu button after pressing escape', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.keyboard.down('Escape');
	await menuClosed();

	expect(await currentFocusID()).toBe('menu-button');
});

it('Disables scroll by arrow key when menu is open', async () => {
	await page.setViewport({
		width: 1000,
		height: 500,
	});

	await page.click('#menu-button');
	await menuOpen();

	const currentScrollY = await page.evaluate(() => window.scrollY);
	await page.keyboard.down('ArrowDown');
	await sleep(1000); // Give page time to scroll
	expect(await page.evaluate(() => window.scrollY)).toBe(currentScrollY);
});

it('Does not disable scroll by arrow key when menu is closed', async () => {
	await page.setViewport({
		width: 1000,
		height: 500,
	});

	const currentScrollY = await page.evaluate(() => window.scrollY);
	await page.keyboard.press('ArrowDown');
	await sleep(1000); // Give page time to scroll
	expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(currentScrollY);
});

it('Focuses on the next item in the tab order after pressing tab', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.keyboard.down('Tab');
	await menuClosed();

	expect(await currentFocusID()).toBe('next-link');
});

it('Focuses on the previous item in the tab order after pressing shift-tab', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.keyboard.down('Shift');
	await page.keyboard.down('Tab');
	await menuClosed();

	expect(await currentFocusID()).toBe('menu-button');
});

it('Closes the menu if you click outside of it', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	await page.click('h1');
	await menuClosed(); // times out if menu doesn't close

	expect(true).toBe(true);
});

it('Leaves the menu open if you click inside of it', async () => {
	await page.focus('#menu-button');
	await page.keyboard.down('Enter');
	await menuOpen();

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	page.once('dialog', async (dialog) => {
		await dialog.dismiss();
	});

	await page.click('#menu-item-3');
	await sleep(1000); // visibility: hidden is delayed via CSS
	expect(await menuIsOpen(page)).toBe(true);

	const { xOffset, yOffset } = await page.evaluate((el: Element | null) => {
		if (!el) {
			throw new Error('Element should exist');
		}

		const { left: xOffset, top: yOffset } = el.getBoundingClientRect();
		return { xOffset, yOffset };
	}, await page.$('#menu'));

	await page.mouse.click(xOffset + 2, yOffset + 2); // Click just inside the top left corner (`page.click()` clicks the center, which is a link to NPM)
	await sleep(1000); // visibility: hidden is delayed via CSS
	expect(await menuIsOpen(page)).toBe(true);

	expect(true).toBe(true);
});

it('Reroutes enter presses on menu items as clicks', async () => {
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
