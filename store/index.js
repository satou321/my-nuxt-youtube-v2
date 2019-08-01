/*
* 汎用ステート置き場
* store/index.jsは他のモジュールをラップするので重複データおかないこと
* */
export const state = () => ({});
export const getters = {};
export const mutations = {};
export const actions = {
  // flow.0
  //nuxtServerInit works only in index.js
  //server sideなのでfirebaseのクライアントサイドユーザー認証はここでは使えない
  async nuxtServerInit({dispatch}, ctx) {

    /* nuxtServerInitでリダイレクトさせる方法
     https://scrapbox.io/gyarasu/%5BNuxt%5D_nuxtServerInit%E3%81%A7%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88%E3%81%95%E3%81%9B%E3%82%8B%E6%96%B9%E6%B3%95
    * */

    /* first get videos from youtube */
    const fetchedVideosObj = await dispatch("youtubeVideos/fetchVideos");
    // console.log(32,fetchedVideosObj)

    //set
    dispatch("youtubeVideos/setVideos", fetchedVideosObj).catch(e=>console.log(e));
  },
};
