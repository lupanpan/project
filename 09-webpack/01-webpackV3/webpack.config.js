/**
 * Created by Mtime on 2018/1/3.
 */

// __dirname 是 node.js 中的一个全局变量，它指向当前执行脚本所在的目录。

// 在 window 下不加这句话会报错，需要引入一下webpack
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "eval-source-map",

    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },

    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/, //用于匹配loaders所处理文件的拓展名的正则表达式(必须)
                use: {
                    loader: "babel-loader" // loader的名称(必须)
                    // options: {
                    //     presets: [
                    //         "env", "react"
                    //     ]
                    // } 放到了.babelrc文件中
                },
                exclude: /node_modules/ //屏蔽不需要处理的文件
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true // 指定启用css modules
                            // localIdentName: '[name]__[local]--[hash:base64:5]' //指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ]
}