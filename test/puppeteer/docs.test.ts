// Imports
import path from 'path';

// Destructured constant for readability
const { keyboard } = page;

// Helper functions used in multiple tests
const currentFocusID = () => page.evaluate(() => document.activeElement.id);

// Tests
beforeEach(async () => {
	await page.goto(`file://${path.join(__dirname, '..', '..', 'docs', 'build', 'index.html')}`);
});

it('has the correct page title', async () => {
	await expect(page.title()).resolves.toMatch('React Accessible Dropdown Menu Hook');
});

it('focuses on the first menu item when the enter key is pressed', async () => {
	await page.focus('#menubutton');
	await keyboard.down('Enter');

	expect(await currentFocusID()).toBe('menuitem1');
});

it('focuses on the menu button', async () => {
	await page.focus('#menubutton');
	await keyboard.down('Enter');
	await keyboard.down('Escape');
	expect(await currentFocusID()).toBe('menubutton');
});

it('focuses on the next item in the tab order', async () => {
	await page.focus('#menubutton');
	await keyboard.down('Enter');
	await keyboard.down('Tab');
	expect(await currentFocusID()).toBe('secondbutton');
});

it('focuses on the previous item in the tab order', async () => {
	await page.focus('#menubutton');
	await keyboard.down('Enter');

	await keyboard.down('Shift');
	await keyboard.down('Tab');
	expect(await currentFocusID()).toBe('menubutton');
});
