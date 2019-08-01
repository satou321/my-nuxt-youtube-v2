export const state = () => ({
  loadingAuth: true,
  isFirstPageLoad: true,
});

export const mutations = {
  setAuth(state, auth) {
    state.isAuthenticated = auth;
  },
  loadingAuth(state, flag) {
    console.log("loadingAuth", flag);
    state.loadingAuth = flag;
  },
  isFirstPageLoad(state) {
    state.isFirstPageLoad = false;
  },
};
export const actions = {
  authListener({commit, dispatch, state}, cb) {
    return new Promise((resolve, reject) => {
      this.$auth.onAuthStateChanged(user => {
          try {
            if (user) {
              this.$toast.show("ログインしました");
              // User is signed in.
              const redirectUri = decodeURIComponent($nuxt.$route.query.redirect_uri || '/');
              if (redirectUri.startsWith("/") !== false && !redirectUri.startsWith("//")) {
                console.log("===redirect!", redirectUri);
                this.$router.push(redirectUri);
              }
            } else {

              /* logged out Or session time out */
              if (!state.isFirstPageLoad) {
                this.$toast.show("ログアウトしました");
              }

              /*　The following is unnecessary because the guard is performed by middleware　*/
              // this.$router.push('/login');
            }

            /* ★ callback. from default.vue */
            try {
              cb(user || false);
            } catch (e) {
              console.log(e);
            }

            resolve(true);
          } catch {
            reject("api failed");
          }
          commit("loadingAuth", false);
          commit("isFirstPageLoad");
        },
      );
    });
  },

  /*
  * quickstart-js/auth/google-redirect
  * https://github.com/firebase/quickstart-js/blob/master/auth/google-redirect.html
  * */
  async toggleSignIn({commit, dispatch}) {
    console.warn("==Start toggleSignIn...");
    // const failureCb = (e, msg) => console.warn(e, msg);
    console.log(this.$auth.currentUser);

    // currentUserはAuthオブジェクトの初期化が完了していない場合もnullになる
    // onAuthStateChangedなら対処不要
    // https://firebase.google.com/docs/auth/web/manage-users?hl=ja#get_the_currently_signed_in_user
    if (!this.$auth.currentUser) {
      commit("loadingAuth", true);

      // ★
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth.signInWithRedirect(provider)
        .catch(e => {
          commit("loadingAuth", false);
          this.$toast.show("通信エラー");
          return console.warn("sign in error.code:", 22, e);
        });
    } else {
      console.log("====signOut実行==");
      await dispatch("_signOut").catch(e => console.error("Failed to logged out(3)", e));
      console.log("====/signOut終了==");
    }
    console.log("==/End toggleSignIn===");
  },

  async _signOut({commit}) {
    try {
      console.log("==Start singOut...");
      commit("loadingAuth", true);
      await this.$auth.signOut().catch(() => console.error("Failed to sign out"));

      this.$router.push('/login');
      // onAuth内でfalseにしているので下記不要
      // commit("loadingAuth", false);
      console.log("===/End signOut===");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
export const getters = {
  loadingAuth: state => state.loadingAuth,
  isFirstPageLoad: state => state.isFirstPageLoad,
};
