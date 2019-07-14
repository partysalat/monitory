const DEBUG_ENABLED = process.env.MONITORY_DEBUG === 'true';
const path = require('path');
const rootPath = require('app-root-path').toString();

module.exports = {
  context: path.resolve(__dirname, '..', 'frontend'),
  mode: DEBUG_ENABLED ? 'development' : 'production',
  devtool: 'sourcemap',
  entry: {},
  output: {
    filename: '[name]',
  },
  plugins: [],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 100000000,
      cacheGroups: {
        vendors: {
          name: 'libraries.js',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common.js',
        },
      },
    },
  },
  module: {
    rules: [
      { test: /\.(css)$/, use: 'css-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: {
          test: /node_modules/,
          exclude: path.resolve(rootPath, 'node_modules', 'monitory'),
        },
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              'styled-components',
              ['@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],

              '@babel/plugin-proposal-class-properties',
            ],
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  stats: DEBUG_ENABLED ? 'errors-only' : 'normal',
  performance: false,
  watch: DEBUG_ENABLED,
};
