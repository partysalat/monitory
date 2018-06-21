module.exports = {
  entry: {},
  output: {
    filename: '[name].js',
  },
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
    hot: true,
    // content: ['lib/browser/view'],
  },
};
