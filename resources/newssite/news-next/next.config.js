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
        return {
            ...webpackConfig,
            optimization: {
                minimize: false,
            },
        };
    },
};

module.exports = nextConfig;
