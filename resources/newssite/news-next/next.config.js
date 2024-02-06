const TerserPlugin = require("terser-webpack-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "dist",
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },

  webpack(webpackConfig) {
    console.log(webpackConfig.optimization.minimizer[0].toString())
    return {
      ...webpackConfig,
      optimization: {
        //minimize: false,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {

              format: { beautify: true },
              mangle: false
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            },
          }),
        ],
      }
    }
  },
};

module.exports = nextConfig;
