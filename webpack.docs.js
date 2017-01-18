var Path = require('path');
var Webpack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var Production = process.env.NODE_ENV === 'production';

module.exports = {
    context: Path.resolve(__dirname, './src'),
    entry: './docs.js',

    output: {
        path: Path.resolve(__dirname, './docs'),
        publicPath: Production ? '' : '/',
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

    plugins: [
        new HTMLPlugin({
            inject: false,
            template: require('html-webpack-template'),

            title: 'React Banner | A flexible banner component',
            appMountId: 'root',
            mobile: true,
            favicon: './favicon.ico',
            baseHref: Production ? 'https://skipjack.github.io/react-banner/' : undefined,
            scripts: Production ? [
                'spa-redirect.js'
            ] : [],
            meta: {
                description: 'A flexible banner component built with ReactJS.'
            }
        }),

        new CopyWebpackPlugin([
            { from: '404.html' },
            { from: 'spa-redirect.js' }
        ])
    ],

    devServer: {
        port: 8090,
        contentBase: Path.resolve('./docs'),
        compress: true,
        inline: true,
        historyApiFallback: true
    }
}
