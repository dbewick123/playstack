export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
  },

  moduleNameMapper: {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  '@mui.*\\.svg$': '<rootDir>/src/__mocks__/svgrMuiMock.tsx',
  '^.+/platforms/.+\\.svg\\?react$': '<rootDir>/src/__mocks__/svgrPlatformMock.tsx',
  '\\.svg\\?react$': '<rootDir>/src/__mocks__/svgrMock.tsx',
  '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
},

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
