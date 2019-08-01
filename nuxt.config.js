const environment = process.env.NODE_ENV || 'development';
const envSet = require(`./config/env.${environment}.js`);
import colors from 'vuetify/es5/util/colors';
import ja from './locales/ja/ja.js';
import en from './locales/en/en.js';
// import ja from 'vuetify/es5/locale/ja'
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    {src: '@/assets/skeleton.styl', lang: 'stylus'},
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~plugins/firebase.js",
    "~plugins/axios.js",
    // "~plugins/vuetify.js", //error
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'vue-scrollto/nuxt',
  ],
  toast: {
    position: 'bottom-center',  //トーストの表示位置
    duration: 5000,           //トーストの表示されている時間（今回は2秒に設定）
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxyHeaders: false,
    proxy: false,
    baseURL: envSet.VIDEO_API_URL,
    browserBaseURL: envSet.VIDEO_API_URL,
    credentials: false,
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    lang: {
      locales: {ja, en},
      current: 'ja',
    },
    icons: {
      iconfont: "fa",
    },

    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        iconfont: "fa",
        light: {
          primary: colors.red.accent2,
          accent: colors.pink.base,
          secondary: colors.lime.base,
          info: colors.red.base,
          warning: colors.orange.base,
          error: colors.red.accent2,
          success: colors.teal.base,
          border: colors.grey.base,
          footerBgColor: "#fff",
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
  env: envSet,
  server: {
    port: envSet.PORT || process.env.PORT,// default: 3000
    host: envSet.HOST || process.env.HOST, // default: localhost
  },

};
