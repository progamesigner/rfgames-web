const path = require('path')

const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    devtool: isProduction ? false : 'eval-source-map',
    entry: [
      './scripts/main.ts',
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
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
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
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
    }
  }
}
