module.exports = {
  target: "serverless", // required to deploy serverless functions to Netlify
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer, dev, webpack }) => {
    console.log(`Webpack version: ${webpack.version}`);

    return config;
  },
};
