import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.dev.js'

const app = express()

app.use(webpackMiddleware(webpack(webpackConfig)))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8000)