const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'tslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: path.resolve(__dirname, '..', 'node_modules'),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
