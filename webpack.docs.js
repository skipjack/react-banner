// Foundational
const path = require('path')
const webpack = require('webpack')

// Plugins
const HTMLPlugin = require('html-webpack-plugin')
const HTMLTemplate = require('html-webpack-template')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = (env = {}) => ({
    mode: env.dev ? 'development' : 'production',
    devtool: 'source-map',
    context: path.resolve(__dirname, './src'),
    entry: [
        'react-hot-loader/patch',
        './docs.jsx'
    ],
    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.css' ]
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
                            configFile: path.resolve(__dirname, './.eslintrc')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'remark-loader',
                        options: {
                            plugins: [
                                require('remark-highlight.js')
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            inject: false,
            template: HTMLTemplate,
            title: 'React Banner | A flexible banner component',
            appMountId: 'root',
            mobile: true,
            favicon: './favicon.ico',
            baseHref: env.dev ? '/' : 'https://skipjack.github.io/react-banner/',
            scripts: env.dev ? [] : [ 'spa-redirect.js' ],
            meta: {
                description: 'A flexible banner component built with ReactJS.'
            }
        }),
        new CopyPlugin([
            { from: '404.html' },
            { from: 'spa-redirect.js' }
        ]),
        new webpack.DefinePlugin({
            PRODUCTION: !env.dev,
            'process.env.NODE_ENV': env.dev ? `'development'` : `'production'` 
        }),
        ...(env.dev ? [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ] : [])
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true
            })
        ]
    },
    performance: {
        hints: false
    },
    output: {
        path: path.resolve(__dirname, './docs'),
        publicPath: env.dev ? '/' : '',
        filename: 'root.bundle.js'
    },
    devServer: {
        hot: true,
        port: 8090,
        inline: true,
        compress: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './docs')
    }
})