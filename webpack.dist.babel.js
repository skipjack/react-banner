import Path from 'path'
import Webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    context: Path.resolve(__dirname, './src'),
    entry: './banner/banner.jsx',

    resolve: {
        extensions: [ '.js', '.jsx', '.css' ]
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false
                            }
                        }
                    ]
                })
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
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        
        new Webpack.optimize.UglifyJsPlugin({
            comments: false
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
