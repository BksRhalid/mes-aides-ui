var webpack = require('webpack');


module.exports = {
    entry: {
        'birthdate': './front/questions/birthdate.js',
        'nationality': './front/questions/nationality.js',
        'housing': './front/questions/housing.js',
        'postal-code': './front/questions/postal-code.js',
        'stay-permit': './front/questions/stay-permit.js',
        'lib': './front/lib/index.js',
        'ludwig': './front/lib/ludwig.js',
    },
    output: {
        path: './dist/js',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /front\/questions\//,
                loader: 'expose',
                query: 'currentQuestion',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
        ],
    },
}
