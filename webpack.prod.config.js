const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.s[sa]ss$/i,
                use: [MiniCssExtractPlugin.loader,
                      'css-loader',
                      'sass-loader'
                     ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[hash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    }
};