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
        exclude: /node_modules/,
        use: ['babel-loader'],
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
