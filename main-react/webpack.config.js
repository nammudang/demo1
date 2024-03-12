import { ModuleFederationPlugin } from 'webpack/container';


module.exports = {
    // Other webpack configurations...
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        remotes: {
          remoteModule: 'remoteModule@http://localhost:5174/remoteEntry.js',
        },
      }),
    ],
  };