
const path = require("path");
const webpack = require("webpack");

module.exports = {
    devtool: 'inline-source-map',
    entry: "./src/index.js",
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'env', 'stage-2'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            { 
                test: /\.(png|jpg)$/, 
                use: [
                    { loader: 'url-loader?limit=8192'},
                    { loader: 'file-loader'}
                ]
            }
        ]   
    },

    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    ]
};