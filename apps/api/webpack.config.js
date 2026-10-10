const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api'),
    // 1. Keep source maps only in development to reduce production bundle size
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      // 2. Market Standard: Enable optimization ONLY in production
      optimization: process.env.NODE_ENV === 'production',
      // 3. Keep 'none' for Node.js apps to ensure predictable stack traces
      outputHashing: 'none',
      // 4. Critical for 2025: Automatically creates a package.json in /dist for Docker
      generatePackageJson: true,
      // 5. Dynamic source maps
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
  ],
};
