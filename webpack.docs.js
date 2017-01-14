var Path = require('path');
var Webpack = require('webpack');

module.exports = {
    context: Path.resolve(__dirname, './src'),
    entry: './docs.js',

    output: {
        path: Path.resolve(__dirname, './docs'),
        publicPath: '/',
        filename: 'root.bundle.js'
    },

    resolve: {
        extensions: [ '', '.js', '.jsx', '.json', '.css' ]
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'babel-loader', 
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                loaders: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                loaders: [
                    'json-loader'
                ]
            }
        ]
    },

    eslint: {
        fix: true,
        configFile: Path.resolve(__dirname, './.eslintrc')
    },

    devServer: {
        port: 8090,
        contentBase: Path.resolve('./docs'),
        compress: true,
        inline: true,
        historyApiFallback: true
    }
}
