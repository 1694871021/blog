var { resolve } = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/main.js', //webpack打包入口
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  devServer: {
    static: './src/'  // webpack服务器访问入口
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     css: ExtractTextPlugin.extract({
        //       use: 'css-loader',
        //       fallback: 'vue-style-loader'
        //     })
        //   }
        // }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // 处理图片的loader
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块
          esModule: false
        },
      },
      // 处理html中的图片的loader
      {
        test: /\.html$/,
        loader: 'html-loader',
        // outputPath: ''指定模块输目录
      },
      // // 处理其他资源的loader
      // {
      //   exclude: /\.(html|js|css|less|jpg|png|gif)/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[hash:10].[ext]'
      //   }
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-webpack-te',
      template: './src/public/index.html',
      filename: 'index.html' //输出的文件
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  // devServer: {
  //   open: false,
  //   host: "127.0.0.1",
  //   port: 3082,
  //   proxy: {
  //     "/apis": {
  //         target: "http://192.168.0.224:18090", // 接口域名
  //         ws: true,
  //         changeOrigin: true // 是否跨域
  //     }
  //   }
  // }
  mode: 'development', // 开发模式
}