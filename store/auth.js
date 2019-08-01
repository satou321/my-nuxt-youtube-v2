export const state = () => ({
  alreadyCheckedAuth: false,
});

export const mutations = {
  setAuth(state, auth) {
    state.isAuthenticated = auth;
  },
  alreadyCheckedAuth(state, flag) {
    console.log("alreadyCheckedAuth", flag);
    state.alreadyCheckedAuth = flag;
  },
};
export const actions = {
  userListener({commit, dispatch,state}) {
    return new Promise((resolve => {
      this.$auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          dispatch("userData/setUserData", user, {root: true}).catch(e => console.log("setUserDataError",e));

          // dispatch("favs/favListenerById", user.uid, {root: true}).catch(e => console.log("favListnerById Error:", e));


          const redirectUri = decodeURIComponent($nuxt.$route.query.redirect_uri || '/');
          if (redirectUri.startsWith("/") !== false && !redirectUri.startsWith("//")) {
            console.log("===redirect!", redirectUri);
            this.$router.push(redirectUri);
          }
          //TODO:色変え
          this.$toast.show(user.displayName + "さん、こんにちは！");
        } else {
          //logged out Or session time out
          if (state.alreadyCheckedAuth) {
            this.$toast.show("ログアウトしました")
          }

          // User is signed out OR not logged in
          //他タブでログアウトしても呼ばれる
          // console.log("clear user data AND favs");
          dispatch("userData/clear", null, {root: true}).catch(e => console.error("Failed to logged out(1)", e));
          console.log("favs/clear");
          dispatch("favs/clear", null, {root: true}).catch(e => console.error("Failed to logged out(2)", e));

          //ガードはmiddlewareで行うので下記不要
          // this.$router.push('/login');

        }
        commit("alreadyCheckedAuth", true);
        //TODO:check
        resolve(user || false);
      });
    }));
  },

  /*
  * quickstart-js/auth/google-redirect
  * https://github.com/firebase/quickstart-js/blob/master/auth/google-redirect.html
  * */
  async toggleSignIn({commit, dispatch}) {
    console.warn("==Start toggleSignIn...");
    // const failureCb = (e, msg) => console.warn(e, msg);

    // currentUserはAuthオブジェクトの初期化が完了していない場合もnullになる
    // onAuthStateChangedなら対処不要
    // https://firebase.google.com/docs/auth/web/manage-users?hl=ja#get_the_currently_signed_in_user
    if (!this.$auth.currentUser) {
      commit("alreadyCheckedAuth", false);

      // ★
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth.signInWithRedirect(provider).catch(e => {
        commit("alreadyCheckedAuth", true);
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

  async _signOut({commit, dispatch}) {
    console.log("==Start singOut...");
    commit("alreadyCheckedAuth", false);
    dispatch("favs/clear", null, {root: true}).catch(e => console.error("Failed to clear fav", e));
    await this.$auth.signOut().catch(e => console.error("Failed to sign out", e));

    this.$router.push('/login');
    this.$toast.show("ログアウトしました");
    // onAuth内でtrueにしているので下記不要
    // commit("alreadyCheckedAuth", true);
    console.log("===/End signOut===");
  },
};
export const getters = {
  alreadyCheckedAuth: state => state.alreadyCheckedAuth,
};
