export const state = () => ({
  isLoading: false,
});
export const mutations = {
  //TODO:unused?
  setLoading(state) {
    state.isLoading = !state.isLoading;
    console.log("changed load flag", state.isLoading);
  },
};

export const actions = {
  async setLoading(ctx, flag) {
    if (typeof flag === "object") {
      console.log(flag);
      flag = false;
    }
    await $nuxt.$nextTick(() => {
      ctx.commit("setLoading", flag);
    });
  },
};
export const getters = {
  isAuthLoading: (state, getters, rootState, rootGetters) => {
    return rootGetters["auth/loadingAuth"];
  },
};
