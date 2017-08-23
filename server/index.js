import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev.js'

import users from './routes/api/v1/users'
import auth from './routes/api/v1/auth'
import events from './routes/api/v1/events'

const app = express()

// db
mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost:27017/reddice')

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
app.use('/api/v1/auth', auth)
app.use('/api/v1/events', events)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.use((err, req, res, next) => {
  console.log(err)
})

app.listen(8000)