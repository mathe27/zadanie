const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
                'dist': path.resolve(__dirname, 'dist'),

}
module.exports = {
  entry: './src/js/index.js',
  mode:"development",
  output: {
    filename: 'main.js',
    path: PATHS.dist,
  },
  devServer: {
    static: {
      directory: PATHS.dist,
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
