module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer, dev, webpack }) => {
    console.log(`Webpack version: ${webpack.version}`);

    return config;
  },
};
