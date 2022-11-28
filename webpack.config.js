const path = require('path')

module.exports = {
    mode: 'production',
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.ts$/,
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
        path: path.resolve('dist'),
        library: 'esperaFila',
        libraryTarget: 'window',
        libraryExport: 'default'
    }
}
