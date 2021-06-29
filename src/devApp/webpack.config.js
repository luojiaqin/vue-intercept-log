const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        main: ['./app/main.js']
    },
    module: {
        rules: [{
            test: /\.js$/, use: 'babel-loader'
        },{
            test: /\.vue/, use: 'vue-loader'
        },{
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }]
    },
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/__build__/'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            'vue-plugin': path.join(__dirname, '..', 'src'),
            '@': path.resolve(__dirname, "src")
        }
    },
    context: __dirname,
    node: {
        __dirname: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new VueLoaderPlugin()
    ]
}