var webpack = require('webpack')

let plugins = []
plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  mangle: {
    except: ['$', 'exports', 'require']
  }
}))
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}))

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: 'public/script'
  },
  devtool: 'hidden-soure-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|dest)/, loader: 'babel-loader' },
      { test: /\.et/, loader: 'ei-loader' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: plugins
}
