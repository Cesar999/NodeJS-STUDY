const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: 'production',
    entry: { 
        index: path.resolve(__dirname, "front-end/src", "main.js") 
    },
    output: {
        path: path.resolve(__dirname, "build"),
        assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "front-end/src", "index.html")
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        })
    ]
};