export const state = () => ({
  searchText: "",
});
export const mutations = {
  setSearchText(state, payload) {
    state.searchText = payload;
  },
};
export const actions = {

  async searchVideos({commit, state, dispatch, error}, searchText) {
    if (searchText === state.searchText) {

      console.log("★取得済みを表示。新規取得しない", searchText, state.searchText);
      return;
    }
    commit("setSearchText", searchText);

    try {

      dispatch("youtubeVideos/clear", null, {root: true}).catch(e => console.log(e));

      //get and set
      const fetchedVideosObj = await dispatch("youtubeVideos/fetchVideos", searchText, {root: true})
        .catch(e => console.warn(e));
      dispatch("youtubeVideos/setVideos", fetchedVideosObj, {root: true}).catch(e => console.log(e));
      return Promise.resolve(true)
    } catch (e) {
      console.warn(e);
      return Promise.reject(e)
    }

  },
};
