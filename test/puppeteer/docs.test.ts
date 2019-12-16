// Destructured constant for readability
const { keyboard } = page;

// Tests
beforeAll(async () => {
	await page.goto('http://localhost:3000');
	await page.waitFor(() => document.querySelector('#menubutton'));
});

it('should have correct page title', async () => {
	await expect(page.title()).resolves.toMatch('React Accessible Dropdown Menu Hook');
});

it('should focus on the first menu item when the enter key is pressed', async () => {
	await page.focus('#menubutton');
	await keyboard.down('Enter');

	const currentFocus = await page.evaluate(() => document.activeElement.id);

	expect(currentFocus).toBe('menuitem1');
});
