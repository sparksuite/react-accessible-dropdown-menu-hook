import type { Config } from '@jest/types';
import presetTSJest from 'ts-jest/jest-preset';
import presetJestPuppeteer from 'jest-puppeteer/jest-preset.js';
import merge from 'merge';

const config: Config.InitialOptions = merge.recursive(presetTSJest, presetJestPuppeteer, {
	displayName: 'Browser environment',
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	verbose: true,
});

export default config;
