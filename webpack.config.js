const path = require("path");

module.exports = {
    mode: 'production',
    entry: './index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'waitQueueAsPromise',
        libraryTarget: 'window',
        libraryExport: 'default'
    }
}
