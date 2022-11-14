const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/DJMV-IS216Project/" : "/",
})

// pwa: {
//   workboxOptions: {
//     exclude: [/_redirects/]
//   }
// }