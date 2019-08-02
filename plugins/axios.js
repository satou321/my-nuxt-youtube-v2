import Vue from 'vue';

export default function ({$axios}) {
  $axios.onRequest(config => {


    const localAddr = "http://" + process.env.HOST + ":" + process.env.PORT + "/";
    // return console.log(localAddr,$axios.defaults.baseURL);
    if (localAddr === $axios.defaults.baseURL) {
      return Promise.reject("[axios.js]local address same as the $axios base URL => local:" + localAddr + " axios:" + $axios.defaults.baseURL);
    } else if (localAddr === undefined || $axios.defaults.baseURL === undefined) {
      return Promise.reject("[axios.js]local address or $axios base URL is undefined=> local:" + localAddr + " axios:" + $axios.defaults.baseURL);
    }


    // config.headers.common['Authorization'] = process.env.APIKEY;
    // console.log(3333, config.headers.common);
  });
  $axios.onError(e => {
    if (process.browser) {
      $axios.onError(e => Vue.toasted.show(error));
    }
  });
}
