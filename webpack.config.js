const path = require('path');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: "./scripts/application.js",
  output: {
    path: path.resolve(__dirname, "assets"), // string
    filename: "application.compiled.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.s[ac]ss$/i, use: [ MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: { url: false }
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              importer: globImporter()
            }
          }
        }
      ]},
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'theme.compiled.css'
    }),
  ],
}