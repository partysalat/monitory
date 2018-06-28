module.exports = {
  mode: 'production',
  devtool: 'sourcemap',
  entry: {},
  output: {
    filename: '[name].js',
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
  },
  serve: {
    host: 'localhost',
    hot: false,
    logLevel: 'warn',
    noClipboard: true,
  },
};
