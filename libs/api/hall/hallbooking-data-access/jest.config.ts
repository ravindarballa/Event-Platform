import type { Config } from 'jest';

const config: Config = {
  displayName: 'api-hall-data-access',
  preset: '../../../../jest.preset.ts', // points to workspace Jest preset
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json', // your spec tsconfig
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../../../coverage/libs/api/hall/hallbooking-data-access',
};

export default config;
