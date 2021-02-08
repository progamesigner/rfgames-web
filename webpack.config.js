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
        },
        {
          test: /\.png$/i,
          use: 'url-loader'
        }
      ]
    },
    output: {
      chunkFilename: isProduction ? '[contenthash].chunk.js' : '[name].chunk.js',
      filename: isProduction ? '[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'assets', 'dist'),
      publicPath: '/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? '[contenthash].css' : '[name].css'
      }),
      new ManifestPlugin.WebpackManifestPlugin({
        fileName: path.join(path.resolve(__dirname, 'data'), 'assets.json'),
        publicPath: false
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.png'],
    }
  }
}
