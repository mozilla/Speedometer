const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /RecorderWorklet\.ts$/,
                loader: "null-loader",
            },
            {
                test: /\.worker\.ts$/,
                loader: "null-loader",
            },
            {
                test: /Worker.min.js$/,
                loader: "null-loader",
            },
            {
                test: /PosthogAnalytics\.ts$/,
                loader: "null-loader",
            },
            {
                test: /BlurhashEncoder\.ts$/,
                loader: "null-loader",
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|svg|woff2)$/,
                loader: "null-loader",
            },
            {
                test: /\.(wasm)$/,
                type: "javascript/auto",
                loader: "null-loader",
            },
        ]
    },

    output: {
        globalObject: "globalThis"
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        mainFields: ['matrix_src_browser', 'matrix_src_main', 'browser', 'main'],

        alias: {
            "$webapp": path.resolve(__dirname, 'webapp'),
        },

        fallback: {
            fs: false,
            "crypto": require.resolve("crypto-browserify"),
            "util": require.resolve("util/"),
            "buffer": require.resolve("buffer/"),
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_DEBUG': JSON.stringify(false),
        }),
    ],

    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin()],
    },
};
