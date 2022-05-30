require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    // Enable enviroment variables
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )

    // Enable ".pdf" files
    config.module.rules.push({
      test: [/\.(pdf)$/,],
      loader: "file-loader",
      options: {
        name: '[name].[ext]',
      },
     })

    // Return custom config
    return config;
  }
}