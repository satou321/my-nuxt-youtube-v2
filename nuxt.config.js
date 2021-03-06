const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./config/env.${environment}.js`)
import colors from 'vuetify/es5/util/colors'
import ja from './locales/ja/ja.js'
import en from './locales/en/en.js'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [{ src: '@/assets/skeleton.styl', lang: 'stylus' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/firebase.js',
    '~plugins/axios.client.js',
    '~plugins/vue-js-modal'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'vue-scrollto/nuxt'
  ],
  toast: {
    position: 'bottom-center',
    duration: 5000
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    // credentials: false
  },
  proxy: {
    /* nuxtServerInitでは、ssrにより表示を行うため、Proxy挟まなくてもデータ取得できる。
      一方でメソッド内ではブラウザアクセスなのでcorsエラーが起こる
       https://qiita.com/naokada/items/394c1d85ad2975ba62f0
    */
    '/api/': {
      target: envSet.VIDEO_API_URL,
      pathRewrite: { '^/api/': '' }
    }
  },
  /*
   *https://rocky-falls-88494.herokuapp.com/y?key=AIzaSyDbALNJ0CF2YS5EN9sApUO_kulyY8yd7Hw&q=cute+baby+animals&pageToken=&maxResults=5&order=viewCount* vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    lang: {
      locales: { ja, en },
      current: 'ja'
    },
    // doesn't work
    icons: {
      font: true,
      iconfont: 'fa'
    },

    // customVariables: ['@/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      iconfont: 'fa',
      themes: {
        light: {
          primary: colors.red.accent2,
          accent: '#6ac8d6',
          accent2: '#2CBCD6',
          secondary: '#6AC8AB',
          info: colors.red.base,
          warning: colors.orange.base,
          error: colors.red.accent2,
          success: colors.teal.base,
          border: '#d6d6d6',
          footerBgColor: '#fff'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    terser: {
      parallel: true,
      cache: false,
      sourceMap: true,
      extractComments: {
        filename: 'LICENSES'
      },
      terserOptions: {
        compress: {
          drop_console: true
          // process.env.NODE_ENV === 'production' ||
          // process.env.NODE_ENV === 'training',
        }
      }
    },
    // splitChunks: {
    //   layouts: true,
    //   pages: true,
    //   commons: true
    // },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    analyze: false
  },
  env: envSet,
  server: {
    port: envSet.PORT || process.env.PORT, // default: 3000
    host: envSet.HOST || process.env.HOST // default: localhost
  },
  styleResources: {
    stylus: ['@/assets/style.styl']
  }
};
