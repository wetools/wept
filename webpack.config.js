module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: 'public/script'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|dest)/, loader: 'babel-loader' },
      { test: /\.html/, loader: 'html-loader' },
      { test: /\.et/, loader: 'ei-loader' },
      { test: /\.json$/, loader: 'json' }
    ]
  }
}
