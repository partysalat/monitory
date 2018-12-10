const DEBUG_ENABLED = process.env.MONITORY_DEBUG === 'true';
const config =
module.exports = {
  context: `${__dirname}/../frontend`,
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
          enforce: true,
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
          exclude: /node_modules\/monitory/,
        },
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
              }],
              'react',
              'stage-2',
            ],
            plugins: [
              'transform-runtime',
              'transform-async-to-generator',
              'styled-components',
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
  // serve: {
  //   host: 'localhost',
  //   hotClient: false,
  //   logLevel: 'warn',
  //   noClipboard: true,
  // },
};
