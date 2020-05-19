module.exports = {
  plugins: [
    require('cssnano')({
      preset: [
        'default',
        {
          autoprefixer: {},
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}
