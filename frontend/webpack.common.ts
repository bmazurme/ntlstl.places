import path from 'path';
import { merge } from 'webpack-merge';
import { config as dotEnvConfig } from 'dotenv';

import type { Configuration } from 'webpack';

type Environment = 'development' | 'production' | 'none' | undefined;

dotEnvConfig();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const common = merge<Configuration & {devServer?: any}>({
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
});

export default common;
