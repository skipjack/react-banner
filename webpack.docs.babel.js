import Path from 'path'
import Webpack from 'webpack'
import HTMLPlugin from 'html-webpack-plugin'
import HTMLTemplate from 'html-webpack-template'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default (env = {}) => ({
    devtool: 'source-map',
    context: Path.resolve(__dirname, './src'),
    entry: './docs.jsx',

    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.css', '.md' ]
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
                    'raw-loader'
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
            scripts: env.dev ? [] : [
                'spa-redirect.js'
            ],
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
        
        new Webpack.optimize.UglifyJsPlugin({
            exclude: env.dev ? /.*/gim : /^\s$/,
            sourceMap: true,
            comments: false,
            compress: {
                warnings: false
            }
        })
    ],

    output: {
        path: Path.resolve(__dirname, './docs'),
        publicPath: env.dev ? '/' : '',
        filename: 'root.bundle.js'
    },

    devServer: {
        port: 8090,
        contentBase: Path.resolve(__dirname, './docs'),
        compress: true,
        inline: true,
        historyApiFallback: true
    }
})
