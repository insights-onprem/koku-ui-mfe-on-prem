const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const BG_IMAGES_DIRNAME = 'bgimages';
const ASSET_PATH = process.env.ASSET_PATH || '/';
const NODE_ENV = process.env.NODE_ENV || 'development';

/** @type {import('webpack').Configuration} */
const config = {
  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  entry: path.resolve(__dirname, './src/index.tsx'),
  devServer: {
    host: 'localhost',
    port: 9100,
    historyApiFallback: true,
    open: true,
    static: { directory: path.resolve(__dirname, 'dist') },
    client: { overlay: true },
  },
  module: {
    rules: [
      { test: /\.(jsx?|tsx?)$/, exclude: /node_modules/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(svg|ttf|eot|woff|woff2)$/, type: 'asset/resource' },
      { test: /\.svg$/, include: input => input.indexOf(BG_IMAGES_DIRNAME) > -1, type: 'asset/inline' },
      { test: /\.svg$/, include: input => input.indexOf(BG_IMAGES_DIRNAME) === -1, use: { loader: 'raw-loader', options: {} } },
      { test: /\.(jpg|jpeg|png|gif)$/i, type: 'asset/inline' },
    ],
  },
  output: {
    filename: '[name].bundle-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
    chunkFilename: '[name].bundle-[contenthash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html'), filename: 'index.html' }),
    new CopyPlugin({ patterns: [{ from: '../../libs/i18n/src/*.json', to: 'locales/[name][ext]', noErrorOnMissing: true }] }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css', chunkFilename: '[name].bundle-[contenthash].css' }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../koku-mfe-cloud/tsconfig.json') })],
    alias: {
      routes: path.resolve(__dirname, '../koku-mfe-cloud/src/routes'),
      'routes/*': path.resolve(__dirname, '../koku-mfe-cloud/src/routes/*'),
      api: path.resolve(__dirname, '../../libs/api/src/api'),
      '@koku/api': path.resolve(__dirname, '../../libs/api/src/api'),
      '@koku/i18n': path.resolve(__dirname, '../../libs/i18n/src/i18n'),
      '@koku/components': path.resolve(__dirname, '../../libs/components/src'),
      'routes/components': path.resolve(__dirname, '../../libs/components/src/components'),
      'routes/utils': path.resolve(__dirname, '../../libs/components/src/utils'),
      'locales/messages': path.resolve(__dirname, '../../libs/i18n/src/messages.ts'),
    },
  },
  optimization: { splitChunks: { chunks: 'all' } },
};

if (NODE_ENV === 'production') {
  (config.optimization || {}).minimizer = [
    new TerserJSPlugin({}),
    new CssMinimizerPlugin({ minimizerOptions: { preset: ['default', { mergeLonghand: false }] } }),
  ];
}

module.exports = config;


