// Configuration for jest-puppeteer (read automatically at runtime via cosmiconfig).
// `--no-sandbox` is required to launch Chrome inside CI containers such as
// GitHub-hosted runners; see https://pptr.dev/troubleshooting#setting-up-chrome-linux-sandbox
module.exports = {
	launch: {
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	},
};
