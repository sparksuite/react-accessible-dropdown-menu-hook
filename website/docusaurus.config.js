module.exports = {
	title: 'React Accessible Dropdown Menu Hook',
	tagline: 'A simple Hook for creating fully accessible dropdown menus in React',
	url: 'https://sparksuite.github.io/react-accessible-dropdown-menu-hook/',
	baseUrl: '/react-accessible-dropdown-menu-hook/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'sparksuite',
	projectName: 'react-accessible-dropdown-menu-hook',
	themeConfig: {
		navbar: {
			title: 'React Accessible Dropdown Menu Hook',
			logo: {
				alt: 'Logo',
				src: 'img/logo.png',
			},
			items: [
				{
					to: 'docs/',
					activeBasePath: 'docs',
					label: 'Docs',
					position: 'left',
				},
				{
					to: 'demo/',
					activeBasePath: 'demo',
					label: 'Demo',
					position: 'left',
				},
				{
					href: 'https://github.com/sparksuite/react-accessible-dropdown-menu-hook',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'light',
			links: [
				{
					title: 'GitHub',
					items: [
						{
							label: 'Repository',
							to: 'https://github.com/sparksuite/react-accessible-dropdown-menu-hook',
						},
						{
							label: 'Submit an issue',
							to: 'https://github.com/sparksuite/react-accessible-dropdown-menu-hook/issues/new',
						},
						{
							label: 'How to contribute',
							to: 'https://github.com/sparksuite/react-accessible-dropdown-menu-hook/blob/master/CONTRIBUTING.md',
						},
					],
				},
				{
					title: 'Sparksuite',
					items: [
						{
							label: 'About us',
							href: 'https://www.sparksuite.com',
						},
						{
							label: 'Open source',
							href: 'https://github.com/sparksuite',
						},
						{
							label: 'Careers',
							href: 'https://sparksuite.careers',
						},
					],
				},
			],
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/sparksuite/react-accessible-dropdown-menu-hook/edit/master/website/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
