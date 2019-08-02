// Utilising the Vuex Store
// https://vueschool.io/lessons/utilising-the-vuex-store-nuxtjs?friend=nuxt

import _filter from 'lodash.filter';

export const state = () => ({
  // flow.4
  prevResults: [],
  newResults: [],
  isLoading: false,
  nextPageToken: '',
  pageNum: 1,
  totalResults: 0,
  maxResults: 5,
  error: {
    isError: false,
    message: '',
  },
  showMoreEnabled: true,
  searchText: '',
});

/*
 * Mutations
 * */
export const mutations = {
  setVideos(state, payload) {
    state.prevResults = [...state.prevResults, ...state.newResults];
    state.newResults = [...payload];
  },

  setError(state, message) {
    if (process.browser) {
      this.$toast.show('error:' + message);
    }
    state.error = {isError: true, message: message};
  },
  clearError(state) {
    state.error = {isError: false, message: ''};
  },
  setLoading(state, flag) {
    if (!process.browser) {
      return;
    }

    if (flag) {
      window.$nuxt.$root.$loading.start();
    } else {
      window.$nuxt.$root.$loading.finish();
    }
    state.isLoading = flag;
  },
  incrementPage(state) {
    state.pageNum++;
  },
  decrementPage(state) {
    state.pageNum--;
  },
  setVideosInfo(state, payload) {
    // console.log(4534, payload);
    state.nextPageToken = payload.nextPageToken;
    state.totalResults = payload.pageInfo.totalResults;
  },
  clear(state) {
    state.prevResults = [];
    state.newResults = [];
  },
  setSearchText(state, payload) {
    state.searchText = payload;
  },
};

/*
 * Actions
 * */
//fetch and set
export const actions = {
  async reload({commit, dispatch}) {
    const fetchedObj = await dispatch('fetchVideos').catch(e => console.log(e));

    dispatch('setVideos', fetchedObj).catch(e => console.log(e));
    commit('incrementPage');
  },
  async showMore({commit, dispatch, state, getters}) {
    // if (this.pageNum > 0) {
    console.log(
      'total:',
      state.totalResults,
      ' maxRes:',
      state.maxResults,
      ' page:',
      state.pageNum,
    );
    const _hasMore = getters.hasMore;
    if (!_hasMore || state.nextPageToken === '') {
      console.log('here is last page', _hasMore, state.nextPageToken);
      return;
    }
    const fetchedObj = await dispatch('fetchVideos', state.searchText).catch(
      e => console.log(e),
    );

    dispatch('setVideos', fetchedObj).catch(e => console.log(e));
    commit('incrementPage');
  },
  async fetchVideos({commit, dispatch, state, getters}, searchText = '') {
    const FROM = {
      MOCK: '/j',
      YOUTUBE: '/y',
    };

    try {
      commit('clearError');
      commit('setLoading', true);
      commit('setSearchText', searchText);
    } catch (e) {
      console.log('fetchVideos', e);
      return Promise.reject(e);
    }

    try {
      const res = await this.$axios.$get(FROM.YOUTUBE, {
        params: {
          key: process.env.APIKEY,
          q: searchText || 'cute baby animals',
          pageToken: getters['nextPageToken'],
          maxResults: getters['maxResults'],
          // safeSearch: "",
          // publishedAfter: "2019-01-01T00:00:00Z",
          order: 'viewCount',
        },
      });
      return Promise.resolve(res);
    } catch (e) {
      //TODO:エラー処理外部化
      // console.warn('axios error', '通信エラーが発生しました');
      if (process.browser) {
        this.$toast.show('通信エラーが発生しました');
      }
      return Promise.reject('通信エラーが発生しました');
      // return Promise.reject(e);
    } finally {
      commit('setLoading', false);
    }
  },

  setInfo({commit}, fetchedVideosObj) {
    commit('setVideosInfo', fetchedVideosObj);
  },
  setVideos({commit, dispatch}, fetchedVideosObj) {
    // console.log(7, "[", fetchedVideosObj, !fetchedVideosObj, "]");
    if (!fetchedVideosObj) {
      // 通信エラーだとここにくる
      console.log("Can't setVideos. fetchedVideosObj:{", fetchedVideosObj, '}');
      return Promise.reject();
    }

    let videoObj = {};
    try {
      //format for ease of use
      // console.log(10, "セットした（mutation)");
      videoObj = _filter(fetchedVideosObj.items, x => x.id.videoId !== '').map(
        y => ({
          etag: y.etag,
          title: y.snippet.title,
          description: y.snippet.description,
          imageUrl: y.snippet.thumbnails.high.url,
          videoId: y.id.videoId,
        }),
      );
    } catch (e) {
      console.warn(55,e);
      return Promise.reject(e);
    }

    // console.warn("===ACTION:SET VIDEOS==", videoObj);
    if (Object.keys(videoObj).length) {
      commit('setVideos', videoObj);
    }

    if (fetchedVideosObj) {
      console.warn(33, fetchedVideosObj);
      dispatch('setInfo', fetchedVideosObj).catch(e => console.log(e));
    } else {
      // console.log("通信エラー", fetchedVideosObj.isAxiosError);
    }
  },
  clear({commit}) {
    commit('clear');
  },
};

/*
 * getters
 * */
export const getters = {
  // flow.3
  all(state) {
    return [...state.prevResults, ...state.newResults];
  },
  nextPageToken(state) {
    return state.nextPageToken;
  },
  maxResults(state) {
    return state.maxResults;
  },
  error(state) {
    return state.error;
  },
  isLoading(state) {
    return state.isLoading;
  },
  hasMore(state) {
    if (!state.totalResults) {
      return 0
    }
    return state.totalResults > state.maxResults * state.pageNum;
  },
};
