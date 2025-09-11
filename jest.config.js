const transformIgnorePatterns = [
  'node_modules/(?!(@patternfly/react-core/src|@patternfly/react-icons/dist/esm|uuid/dist/esm-browser))',
];

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  collectCoverage: false,
  // collectCoverageFrom: ['src/**/*.js'],
  // coverageDirectory: './coverage/',
  fakeTimers: {
    enableGlobally: true,
  },
  moduleDirectories: ['node_modules', '<rootDir>/apps/koku-mfe-cloud/src', '<rootDir>/libs'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^api/(.*)$': '<rootDir>/libs/api/src/api/$1',
    '^components/i18n$': '<rootDir>/libs/i18n/src/i18n',
    '^@koku/i18n$': '<rootDir>/libs/i18n/src/i18n',
    '^routes/components/(.*)$': '<rootDir>/libs/components/src/components/$1',
    '^routes/utils/(.*)$': '<rootDir>/libs/components/src/utils/$1',
    '^@koku/components/(.*)$': '<rootDir>/libs/components/src/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/apps/koku-mfe-cloud/src/', '<rootDir>/libs/'],
  setupFiles: ['<rootDir>/test/testEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns,
  transform: {
    '^.+\\.svg$': 'jest-transform-stub',
    '^.+\\.(ts|js)x?$': [
      '@swc/jest',
      {
        $schema: 'http://json.schemastore.org/swcrc',
        jsc: {
          experimental: {
            plugins: [['swc_mut_cjs_exports', {}]],
          },
          parser: {
            jsx: true,
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
};
