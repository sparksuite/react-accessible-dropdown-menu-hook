// Imports
import path from 'path';

// Tests
beforeAll(async () => {
	await page.goto(`file://${path.join(__dirname, '..', '..', 'docs', 'build', 'index.html')}`);
});

it('should have correct page title', async () => {
	await expect(page.title()).resolves.toMatch('React Accessible Dropdown Menu Hook');
});
