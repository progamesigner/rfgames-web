const path = require('path')

const ManifestPlugin = require('webpack-assets-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: [
    './scripts/main.js',
    './styles/main.scss'
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    chunkFilename: '[chunkhash].chunk.js',
    filename: '[name].js',
    jsonpFunction: 'rfgamesJsonp', // @note: to avoid conflict with gw2-embed
    path: path.resolve(__dirname, 'assets'),
    publicPath: '/'
  },
  plugins: [
    new ManifestPlugin({
      integrity: true,
      integrityHashes: ['sha512'],
      output: path.join(path.resolve(__dirname, 'data'), 'assets.json'),
      publicPath: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
