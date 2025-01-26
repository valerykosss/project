const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // подключаем плагин

module.exports = {
  entry: './src/js/index.js',  // точка входа для JS
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // бандл для JS
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // транспиляция JS
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,  // извлекает CSS в отдельный файл
          'css-loader',  // позволяет импортировать CSS в JS
          'sass-loader',  // компилирует SCSS в CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',  // название файла стилей
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',  // путь к шаблону HTML
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // папка с файлами для сервера
    },
    compress: true,
    port: 9000,  // порт для разработки
    open: true, // автоматически откроет страницу в браузере 
  },
};