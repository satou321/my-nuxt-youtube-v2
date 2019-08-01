export const state = () => ({
  title: 'fav',
  clipped: false,
  drawer: false,
  fixed: false,
  miniVariant: false,
  right: true,
  rightDrawer: false,
});

export const mutations = {
  tglDrawer(state, payload) {
    state.drawer = payload;
  },
};

export const actions = {
  tglDrawer({commit}, payload) {
    commit("tglDrawer", payload);
  },

};
