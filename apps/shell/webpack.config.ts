import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/react/module-federation';
import baseConfig from './module-federation.config';

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(baseConfig),
  (config) => {
    // 1. Broadly ignore all source-map-loader warnings from node_modules
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Failed to parse source map/, // Silences any file-not-found for .ts files
      /@module-federation/          // Specifically silences the MF runtime noise
    ];

    // 2. Direct Rule Override (if ignoreWarnings is too broad)
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/@module-federation/
      });
    }

    return config;
  }
);
