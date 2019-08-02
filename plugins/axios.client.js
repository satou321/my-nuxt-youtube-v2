import Vue from 'vue';

export default function({ $axios }) {
  $axios.onRequest(config => {
    $axios.setHeader('Access-Control-Allow-Origin', process.env.VIDEO_API_URL);
    // config.headers.common['Authorization'] = process.env.APIKEY;
    return config;
  });
  $axios.onError(e => {
    if (process.browser) {
      $axios.onError(e => Vue.toasted.show(error));
    }
  });
}
