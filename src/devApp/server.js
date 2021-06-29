const express = require('express')
const rewrite = require('express-urlrewrite')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}))
app.use(rewrite('/','/app/index.html'))
app.use(express.static(__dirname))

const port = process.env.PORT || 9090

module.exports = app.listen(port, ()=>{
    console.log(`server listening on http://localhost:${port},Ctrl+C to stop`)
})