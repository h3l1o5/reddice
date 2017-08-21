import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev.js'

import users from './routes/api/v1/users'

const app = express()

// webpack middlewares
const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

// other middlewares
app.use(bodyParser.json())

// routes
app.use('/api/v1/users', users)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8000)