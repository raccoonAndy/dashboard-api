import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	rootDir: './__tests__',
	testRegex: '.e2e-spec.ts$',
};

export default config;
