module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
		'@babel/preset-react',
	],
	plugins: [
		'@babel/plugin-proposal-nullish-coalescing-operator', // TODO: Will become unnecessary soon: https://github.com/babel/babel/issues/10690
		'@babel/plugin-proposal-optional-chaining', // TODO: Will become unnecessary soon: https://github.com/babel/babel/issues/10690
	],
};
