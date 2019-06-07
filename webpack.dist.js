// Foundational
const Path = require('path')
const Webpack = require('webpack')

// Plugins
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    mode: 'production',
    context: Path.resolve(__dirname, './src'),
    entry: './banner/banner.jsx',
    resolve: {
        extensions: [ '.js', '.jsx', '.css' ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader', 
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true,
                            configFile: Path.resolve(__dirname, './.eslintrc')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCSSExtractPlugin.loader },
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'style.css'
        })
    ],
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
    output: {
        path: Path.resolve(__dirname, './dist'),
        filename: 'react-banner.min.js',
        library: 'Banner',
        libraryTarget: 'umd'
    },
    stats: {
        children: false
    }
}