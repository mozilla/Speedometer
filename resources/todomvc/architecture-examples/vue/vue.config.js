const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "",
  chainWebpack: config => config.optimization.minimize(false)
  /*terser: {
    minify: "terser",
    terserOptions: {
        compress: false
    },
  },*/
})
