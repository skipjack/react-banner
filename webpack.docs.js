const Path = require('path')
const Webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const HTMLTemplate = require('html-webpack-template')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env = {}) => ({
    devtool: 'source-map',
    context: Path.resolve(__dirname, './src'),
    entry: [
        'react-hot-loader/patch',
        './docs.jsx'
    ],

    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.css' ]
    },

    module: {
        loaders: [
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

        new CopyWebpackPlugin([
            { from: '404.html' },
            { from: 'spa-redirect.js' }
        ]),

        new Webpack.DefinePlugin({
            PRODUCTION: !env.dev,
            'process.env.NODE_ENV': env.dev ? `'development'` : `'production'` 
        }),

        ...(env.dev ? [
            new Webpack.NamedModulesPlugin(),
            new Webpack.HotModuleReplacementPlugin()
        ] : [
            new Webpack.optimize.UglifyJsPlugin({
                exclude: /^\s$/,
                sourceMap: true,
                comments: false,
                compress: {
                    warnings: false
                }
            })
        ])
    ],

    output: {
        path: Path.resolve(__dirname, './docs'),
        publicPath: env.dev ? '/' : '',
        filename: 'root.bundle.js'
    },

    devServer: {
        hot: true,
        port: 8090,
        inline: true,
        compress: true,
        historyApiFallback: true,
        contentBase: Path.resolve(__dirname, './docs')
    }
})
