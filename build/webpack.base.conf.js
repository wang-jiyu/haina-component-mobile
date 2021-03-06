const path = require('path');
const utils = require('./utils');
const config = require('../config');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        app: './src/main.tsx'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', ".ts", ".tsx"],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'routes': resolve('src/routes'),
            'views': resolve('src/views')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.ts(x?)$/,
                include: [resolve('src'),resolve('components')],
                use: [
                    {
                        loader:'babel-loader'
                    },
                    {
                     loader:'awesome-typescript-loader'
                    }
                ]
            }
        ]
    }
};
