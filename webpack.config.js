const path = require('path')

const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProduction ? false : 'eval-source-map',
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
    chunkFilename: '[contenthash].chunk.js',
    filename: '[contenthash].js',
    jsonpFunction: 'rfgamesJsonp', // @note: to avoid conflict with gw2-embed
    path: path.resolve(__dirname, 'assets', 'dist'),
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    }),
    new ManifestPlugin({
      fileName: path.join(path.resolve(__dirname, 'data'), 'assets.json'),
      publicPath: false
    })
  ]
}
