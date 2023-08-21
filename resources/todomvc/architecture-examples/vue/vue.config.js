const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "",
    terser: {
        minify: "terser",
        terserOptions: {
            compress: false,
            mangle: false,
            format: { beautify: true },
        },
    },
});
