import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	displayName: 'Test suite',
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: './coverage/',
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	verbose: true,
	preset: 'ts-jest',
	resolver: 'jest-ts-webcompat-resolver',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	testMatch: ['<rootDir>/src/**/*.test.tsx'],
	testEnvironment: 'jsdom',
};

export default config;
