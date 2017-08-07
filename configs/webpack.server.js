const NodeExternals = require('webpack-node-externals');
const Path = require('path');
const Webpack = require('webpack');


module.exports = {
    target:  'node',

    entry:   ['./index.js'],
    output:  {
        path: Path.join(__dirname, '..', 'dist'),
        filename: 'server.js'
    },

    cache:   false,
    context: Path.resolve(__dirname, '..'),
    devtool: 'source-map',
    externals: [
        NodeExternals({ whitelist: ['webpack/hot/poll?1000'] })
    ],
    module:  {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            }
        ],
        noParse: /\.min\.js/
    },
    node:    {
        __dirname: true,
        fs: 'empty'
    },
    plugins: [
        new Webpack.EnvironmentPlugin(['NODE_ENV']),
        new Webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        })
    ],
    resolve: {
        modules: [
            'node_modules',
            Path.resolve(__dirname, 'lib')
        ],
        extensions: ['.json', '.js']
    }
};
