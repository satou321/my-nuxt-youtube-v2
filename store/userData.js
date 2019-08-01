export const state = () => ({
  user: false,
});

export const mutations = {

  updateUser(state, user) {
    state.user = user;
    console.warn("===SET_USER_DATA END");
  },
  clear(state) {
    state.user = false;
  },
};
export const actions = {

  updateUser({commit}, user) {
    console.warn("===SET_USER_DATA START", user);
    let _user = false;
    if (user) {
      _user = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var isAnonymous = user.isAnonymous;
        // var providerData = user.providerData;
      };
    }
    console.log("updateUser", _user);
    commit("updateUser", _user || false);
  },

  clear({commit}) {
    commit("clear");
  },
};
export const getters = {
  user: state => state.user,
};
