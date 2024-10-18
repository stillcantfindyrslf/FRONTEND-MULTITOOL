const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/js/index.js',
    plugins: [
        new HtmlWebpackPlugin( {template: path.resolve(__dirname, 'src', 'index.html')} ),
    ],
    module: {
        rules: [
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource'},
            { test: /\.html$/i, loader: 'html-loader'},
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.css'],
    },
    mode: 'development'
};