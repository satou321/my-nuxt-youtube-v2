// webpack config for Jetbrains Webstorm
// https://github.com/nuxt/nuxt.js/issues/2936#issuecomment-369987598
const path = require('path');
module.exports = {
  resolve: {
    // for WebStorm
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }

};
