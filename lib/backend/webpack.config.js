module.exports = {
  context: `${__dirname}/../frontend`,
  mode: process.env.MONITORY_DEBUG === 'true' ? 'development' : 'production',
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
      {
        test: /\.(css)$/,
        use: [
          // 'style-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     camelCase: true,
          //   },
          // },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: require('./../../tsconfig.json'),
      },
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
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  performance: false,
  serve: {
    host: 'localhost',
    hotClient: false,
    logLevel: 'warn',
    noClipboard: true,
  },
};
