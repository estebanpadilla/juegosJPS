
var path = require('path');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "dist"
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        watchContentBase: true,
        compress: true,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        proxy: {
            '/games/*': {
                target: 'http://private.gamestudiocr.com:8075/games/aspNET/CasinoLobby/Services.asmx?op=Version',
                secure: false,
                changeOrigin: true
            },
        }

    }
}
