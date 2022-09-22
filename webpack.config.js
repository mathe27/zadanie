const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { NoEmitOnErrorsPlugin } = require('webpack');
module.exports = {
  entry: './src/js/index.js',
  mode:"development",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({title:'Zadanie',filename: 'index.html',
    template: './src/js/templates/index.ejs'})
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      
    ],
  },
};
