import path from 'path';
// import { DefinePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import { config as dotEnvConfig } from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';

import type { Configuration } from 'webpack';

type Environment = 'development' | 'production' | 'none' | undefined;

dotEnvConfig();

const client = (env) => merge<Configuration & {devServer: any}>({
  name: 'client',
  target: 'web',
  mode: process.env.NODE_ENV as Environment ?? 'development',
  devtool: 'inline-source-map',
  entry: ['./src/index.tsx'],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      // new DefinePlugin(),
      // new Dotenv(),
      // new DefinePlugin({
      //   'process.env': {
      //     REACT_APP_TEST: JSON.stringify(process.env.REACT_APP_TEST),
      //     // SOME_VALUE: JSON.stringify(process.env.SOME_VALUE),
      //   },
      // }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      publicPath: '/',
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3005,
  },
  plugins: [
    new Dotenv({ path: env.production ? './.env.production' : './.env.development' }),
    // new DefinePlugin({
    //   'process.env': {
    //     REACT_APP_TEST: JSON.stringify(process.env.NODE_ENV),
    //     // SOME_VALUE: JSON.stringify(process.env.SOME_VALUE),
    //   },
    // }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
});

export default [client];
