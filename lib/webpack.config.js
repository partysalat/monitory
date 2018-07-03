const babelEnvDeps = require('webpack-babel-env-deps');

module.exports = {
  context: `${__dirname}/frontend`,
  mode: 'production',
  devtool: 'sourcemap',
  entry: {},
  output: {
    filename: '[name]',
  },
  plugins: [],
  module: {
    rules: [
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
              'env',
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
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact-compat/lib/react-dom-factories',
    },
  },
  serve: {
    host: 'localhost',
    hot: false,
    logLevel: 'warn',
    noClipboard: true,
  },
};
