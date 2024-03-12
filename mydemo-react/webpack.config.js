import { ModuleFederationPlugin } from 'webpack/container';
module.exports = {
    // Other webpack configurations...
    plugins: [
      new ModuleFederationPlugin({
        name: 'remoteModule',
        filename: 'remoteEntry.js',
        exposes: {
          './RemoteComponent': './src/App.jsx',
        },
      }),
    ],
  };