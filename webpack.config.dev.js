import path from 'path'
import webpack from 'webpack'

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client', 'index.js'),
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [ 
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server')
        ],
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
}
