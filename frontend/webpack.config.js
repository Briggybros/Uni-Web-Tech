const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        filename: 'frontend.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    cache: true,
                },
            },
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: path.resolve(__dirname, '..', 'node_modules'),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'src', 'static'),
            to: path.join(__dirname, 'dist'),
        }]),
    ],
};
