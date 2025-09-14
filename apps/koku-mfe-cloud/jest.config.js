const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  rootDir: path.resolve(__dirname, '../..'),
  testMatch: ['<rootDir>/apps/koku-mfe-cloud/src/**/?(*.)+(test).[tj]s?(x)'],
};


