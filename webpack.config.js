const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //creates our index.html file
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const autoprefixer =require ('autoprefixer');
//const WebappWebpackPlugin = require('webapp-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports  = (env)=> {
    const isDevelopment = env.development === true;
    const isProduction = env.production === true;


    console.log("is development",isDevelopment)
    return {

        //Better debugging
        mode: isDevelopment ? 'development' :'production',
        devtool:!isDevelopment?false :'inline-source-map',
        //Our react code location
        entry: ['@babel/polyfill', './index.js'],
        //Where our compiled code goes (including imported components)
        //__dirname means current directory
        output: {
            path: path.join(__dirname, '/dist'),
            filename:  isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
            publicPath: '/'
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3001,
            historyApiFallback: {
                disableDotRule: true
            },
            publicPath: '/'
        },
        //Handle missing polyfills
        resolve:{
            fallback: {
                //    "stream": false
                "stream": require.resolve("stream-browserify"),
                "http": require.resolve("stream-http"),
                "https": require.resolve("https-browserify"),
                "crypto": require.resolve("crypto-browserify"),
                "path": require.resolve("path-browserify"),
                "zlib":require.resolve("browserify-zlib"),
                "vm": require.resolve("vm-browserify"),
                "net":false,
                "fs":false,
                "tls":false,
            }
        },
        //Here we specify our loader
        module: {
            rules: [
                {
                    test: /\.m?js/,
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.jsx?/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                },
                /*   {
                       test: /\.js$/, //takes a regular expression, looks for JS files
                       exclude: /node_modules/,
                       use: {
                           loader: 'babel-loader'
                       }
                   },*/
                {
                    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
                },
                {
                    test: /\.(png|jpg|gif)(\?[\s\S]+)?$/,
                    use: 'file-loader?name=images/[name].[ext]',
                },
                {
                    test: /\.(scss|css)$/, //handles both our css and scss code
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions:{
                                    autoprefixer: {browsers: ["last 2 versions"]},
                                    plugins: () => [autoprefixer]
                                }
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                    use: 'file-loader?name=fonts/[name].[ext]',
                }
            ]
        },
        plugins: [

            new webpack.ProvidePlugin({
                Buffer: ['buffer','Buffer']
            }),
            // A webpack plugin to remove/clean your build folder(s).
            // so that file hashes don't change unexpectedly
        //    new webpack.HashedModuleIdsPlugin(),
            new webpack.ids.HashedModuleIdsPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            new CompressionPlugin({
                filename: '[path][base].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.7
            }),
            new HtmlWebpackPlugin({
                template: './index.html' //looks at this file as our template
            }),
            //Creates Favicons for all browsers
            new FaviconsWebpackPlugin("./public/logo512.png") // svg works too!
            ,
            new Dotenv(),

        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "node_vendors",
                        // can be used in chunks array of HtmlWebpackPlugin
                        test: /[\\/]node_modules[\\/](!lodash)[\\/]/,
                        chunks: "all",
                        priority: 20,
                    },
                    lodash: {
                        name: "lodash", // part of the bundle name and
                        // can be used in chunks array of HtmlWebpackPlugin
                        test: /[\\/](lodash)[\\/]/,
                        chunks: "all",
                        priority: 30,
                    },
                },
            },
        }
    }
};