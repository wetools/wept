var webpack = require('webpack')
var config = require('./webpack.config')

var plugins = config.plugins = []

config.devtool = 'hidden-source-map'

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

module.exports = config
