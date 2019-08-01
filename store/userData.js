export const state = () => ({
  user: false,
});

export const mutations = {
  setUserData(state, user) {
    state.user = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var isAnonymous = user.isAnonymous;
    // var providerData = user.providerData;

    console.warn("===SET_USER_DATA END");
  },
  clear(state) {
    state.user = false;
  },
};
export const actions = {
  setUserData({commit}, user) {
    console.warn("===SET_USER_DATA START", user);
    if (!user || Object.keys(user).length === 0) {
      return;
    }
    console.log("setUserData", user);
    commit("setUserData", user);
  },
  setToken({commit}, token) {
    commit("setToken", token);
  },
  clear({commit}) {
    commit("clear");
  },
};
export const getters = {
  user: (state) => state.user,
};
