const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
  entry: {
    babelpolifill: '@babel/polyfill',
    index: './src/js/main.js'
  },
  output : {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle.js'
  },
  devServer: {
    static: {
        directory: path.join(__dirname, "./dist")
    }
  },
    plugins: [new HtmlWebpackPlugin({   //шаблон для перевода html
        filename: 'index.html',
        template: './src/index.html'
    })],
    module: {
        rules: [
          {
            test: /\.m?js$/,  //Для каких файлов это работает
            exclude: /(node_modules|bower_components)/, //Папки которые нужно исключить из компиляции
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }   //Настройки для babel
    
}




