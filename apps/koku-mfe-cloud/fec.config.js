// Based on https://github.com/RedHatInsights/frontend-components/blob/master/packages/config/src/bin/dev.webpack.config.ts

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { dependencies, insights } = require('./package.json');

const moduleName = insights.appname.replace(/-(\w)/g, (_, match) => match.toUpperCase());
const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './dist/');
const fileRegEx = /\.(png|woff|woff2|eot|ttf|svg|gif|jpe?g|png)(\?[a-z0-9=.]+)?$/;
const stats = {
  excludeAssets: fileRegEx,
  colors: true,
  modules: false,
};

// Show what files changed since last compilation
class WatchRunPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRun', comp => {
      if (comp.modifiedFiles) {
        const changedFiles = Array.from(comp.modifiedFiles, file => `\n  ${file}`).join('');
        const logger = compiler.getInfrastructureLogger(insights.appname);
        logger.info(' ');
        logger.info('===============================');
        logger.info('FILES CHANGED:', changedFiles);
        logger.info('===============================');
      }
    });
  }
}

module.exports = {
  appUrl: '/staging/cost-management',
  debug: true,
  interceptChromeConfig: false, // Change to false after your app is registered in configuration files
  proxyVerbose: true,
  sassPrefix: `.${moduleName}`,
  // sassPrefix: 'body', // For PF v5 testing only
  // bundlePfModules: true, // See https://console.stage.redhat.com/platform-docs/frontend-components/proxies/webpack-proxy#includePFcssmodulesinyourbundle
  stats,
  standalone: process.env.LOCAL_API_PORT ? true : false,
  useCache: true,
  useProxy: process.env.LOCAL_API_PORT ? false : true,
  /**
   * Temporarily disabled HMR -- see https://issues.redhat.com/browse/COST-3224
   *
  ...(process.env.HMR && { _unstableHotReload: process.env.HMR === 'true' }),
   */
  /**
   * Config for federated modules
   */
  moduleFederation: {
    moduleName,
    /**
     * There is a know issue with apps using yarn to build their applications that the router package is not properly shared
     * Same issue was encountered in application services
     * Package can be re-enabled for sharing once chrome starts providing global routing package to all applications
     */
    // exclude: ['react-router-dom'],
    exposes: {
      './RootApp': path.resolve(__dirname, './src/appEntry.tsx'),
      // Shared component module path. Must include default export!
      './MfeOptimizationsBadge': path.resolve(__dirname, './src/fed-modules/mfeOptimizationsBadge.tsx'),
      './MfeOptimizationsBreakdown': path.resolve(__dirname, './src/fed-modules/mfeOptimizationsBreakdown.tsx'),
      './MfeOptimizationsDetails': path.resolve(__dirname, './src/fed-modules/mfeOptimizationsDetails.tsx'),
      './MfeOptimizationsLink': path.resolve(__dirname, './src/fed-modules/mfeOptimizationsLink.tsx'),
      './MfeOptimizationsSummary': path.resolve(__dirname, './src/fed-modules/mfeOptimizationsSummary.tsx'),
      './MfeOptimizationsTable': path.resolve(__dirname, './src/fed-modules/mfeOptimizationsTable.tsx'),
    },
    shared: [
      { 'react-redux': { version: dependencies['react-redux'] } },
      { 'react-router-dom': { version: dependencies['react-router-dom'], import: false, singleton: true } },
      { '@unleash/proxy-client-react': { version: dependencies['@unleash/proxy-client-react'], singleton: true } },
    ],
  },
  /**
   * Add additional webpack plugins
   */
  plugins: [
    new WatchRunPlugin(),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(srcDir, 'locales'),
          to: path.join(distDir, 'locales'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, '../../libs/i18n/src/*.json'),
          to: path.join(distDir, 'locales/[name][ext]'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    modules: [srcDir, path.resolve(__dirname, '../../node_modules')],
    alias: {
      // API
      api: path.resolve(__dirname, '../../libs/api/src/api'),
      '@koku/api': path.resolve(__dirname, '../../libs/api/src/api'),
      // I18n
      'components/i18n': path.resolve(__dirname, '../../libs/i18n/src/i18n'),
      '@koku/i18n': path.resolve(__dirname, '../../libs/i18n/src/i18n'),
      '@koku/i18n/messages': path.resolve(__dirname, '../../libs/i18n/src/messages.ts'),
      'locales/messages': path.resolve(__dirname, '../../libs/i18n/src/messages.ts'),
      'locales/data.json': path.resolve(__dirname, '../../libs/i18n/src/data.json'),
      // App internals
      routes: path.resolve(__dirname, './src/routes'),
      'routes/*': path.resolve(__dirname, './src/routes/*'),
      store: path.resolve(__dirname, './src/store'),
      'store/*': path.resolve(__dirname, './src/store/*'),
      utils: path.resolve(__dirname, './src/utils'),
      'utils/*': path.resolve(__dirname, './src/utils/*'),
      styles: path.resolve(__dirname, './src/styles'),
      'styles/*': path.resolve(__dirname, './src/styles/*'),
      components: path.resolve(__dirname, './src/components'),
      'components/*': path.resolve(__dirname, './src/components/*'),
      // Routes components lib
      'routes/components': path.resolve(__dirname, '../../libs/components/src/components'),
      'routes/utils': path.resolve(__dirname, '../../libs/components/src/utils'),
      '@koku/components': path.resolve(__dirname, '../../libs/components/src'),
    },
  },
  routes: {
    /**
     * Chrome services backend config routes, typically localhost:8000
     */
    ...(process.env.CLOUD_SERVICES_BACKEND_PORT && {
      '/api/chrome-service/v1/static': { host: `http://localhost:${process.env.CLOUD_SERVICES_BACKEND_PORT}` },
    }),
    /**
     * Ephemeral routes, typically localhost:8000
     */
    ...(process.env.EPHEMERAL_PORT && {
      '/api/cost-management/v1/': { host: `http://localhost:${process.env.EPHEMERAL_PORT}` },
    }),
    /**
     * Local API routes, typically localhost:8000
     */
    ...(process.env.LOCAL_API_PORT && {
      '/api/cost-management/v1/': {
        host: `http://${process.env.LOCAL_API_HOST || 'localhost'}:${process.env.LOCAL_API_PORT}`,
      },
    }),
  },
};
