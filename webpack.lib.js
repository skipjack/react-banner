var Path = require('path');
var Webpack = require('webpack');

module.exports = {
    context: Path.resolve(__dirname, './src'),
    entry: './banner/banner.jsx',
    output: {
        path: Path.resolve(__dirname, './dist'),
        filename: 'library.bundle.js',
        library: 'Banner',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [ '', '.js', '.jsx', '.css' ]
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
            }
        ]
    },
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        'react-dom': {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
    eslint: {
        fix: true,
        configFile: Path.resolve(__dirname, './.eslintrc')
    }
}
