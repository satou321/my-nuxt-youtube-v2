export const state = () => ({
  all: [],
  isFetching: false,
  unsubscribe: null,
  showMoreEnabled: true,
});
export const getters = {
  all: (state) => state.all,
  isFavById: (state) => (videoId) => {
    return state.all && state.all.some(x => {
      // console.log("与えられたVideoId=", videoId, "fav登録済みID", x.videoId);
      return x.videoId === videoId;
    });
  },
  isFetching: state => state.isFetching,
};
export const mutations = {
  clear(state) {
    console.log(state.all + "をクリアしました");
    state.all = [];
  },
  /* ログアウト時 */
  _stopListener(state) {
    if (state.unsubscribe) {
      state.unsubscribe();
      state.unsubscribe = null;
      console.warn('FavListener is stopped.');
    }
  },
  add(state, payload) {
    // console.log("like配列に「追加」した");
    state.all.push(payload);
  },
  setIsFetching(state, flag) {
    state.isFetching = !!flag;
  },
  set(state, payload) {
    const index = state.all.findIndex(like => like.videoId === payload.videoId);
    if (index !== -1) {
      // console.log("like配列を「変更」した");
      state.all[index] = payload;
    }
  },
  remove(state, payload) {
    // console.log("like配列から削除した");
    const index = state.all.findIndex(like => like.videoId === payload.videoId);
    if (index !== -1) {
      state.all.splice(index, 1);
    }
  },
  setUnsubscribe(state, unsubscribe) {
    // console.log("before set!", state.unsubscribe);
    state.unsubscribe = unsubscribe;
    // console.log("after set!", state.unsubscribe);

  },

};
export const actions = {
  // vue-hackernews-2.0 https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/api/index.js

  favListenerByUserId({commit, state, dispatch}, userId) {

    if (state.isFetching) {
      console.log("フェッチ中");
      return;
    }
    if (!userId) {
      console.log("ログインしていません。favリスナーを削除しました");
      dispatch('clear');
      return;
    }
    if (state.unsubscribe) {
      console.log("favリスナーを再実行しない");
      return;
    }

    console.log("取得開始 byId", userId);
    //処理中フラグオン
    commit('setIsFetching', true);
    console.warn("Start FavsListener!");
    //LikeデータをDBから取得
    try {
      console.log(this.$firestore);
      let unsub = this.$firestore
        .collection(`users/${userId}/favs`)
        .orderBy('updateAt', 'desc')
        //TODO:制限もうける。このメソッドでは取得せず別メソッドに分ける。whereのarray-containsオプションによる、表示中ビデオに対するfav配列検索を行うため。
        // .limit(state.pageSize)
        .onSnapshot(querySnapshot => {
            // 6. データが更新されるたびに呼び出される
            querySnapshot.docChanges()
              .forEach(change => {
                //DBから配列操作するためのObject
                const payload = {
                  videoId: change.doc.data().videoId,
                  etag: change.doc.data().etag || "",
                  title: change.doc.data().title,
                  imageUrl: change.doc.data().imageUrl,
                  description: change.doc.data().description,
                  updateAt: change.doc.data().updateAt,
                };
                const source = querySnapshot.metadata.fromCache ? "local cache" : "server";
                console.warn("Like Data came from " + source);
                //データが変更されたらミューテーションを通してステートを更新する
                if (change.type === 'added') {
                  console.log("3,added");
                  commit('add', payload);
                } else if (change.type === 'modified') {
                  console.log("3,modified");
                  commit('set', payload);
                } else if (change.type === 'removed') {
                  console.log("3 remove");
                  commit('remove', payload);
                }
              });
            console.log("お気に入り取得終了");
            //処理中フラグオフ
            commit('setIsFetching', false);
          },
          (error) => {
            console.warn("favListenerError", userId, error);
            dispatch("clear");
            //処理中フラグオフ
            commit('setIsFetching', false);
          },
        );
      commit("setUnsubscribe", unsub);

    } catch (e) {
      commit('setIsFetching', false);
      console.log("fire store error", e);
      return e;
    }

  },

  tglFav({dispatch, state, rootGetters}, payload) {
    const {video, isFav} = payload;
    if (!rootGetters["userData/user"]) {
      console.error("ログインしていない");
      return;
    } else {
      console.log("ログインしてる", rootGetters["userData/user"]);
    }
    const userId = rootGetters["userData/user"].uid;
    if (!userId) {
      console.log("userID:", userId);
      return;
    }
    console.log("userID:", userId);


    if (!video || isFav === null) {
      console.log("error:payloadなし", payload);
      return;
    }


    // console.log(32, "isFav", isFav);
    if (isFav) {
      //delete
      console.log("delete", userId, video);
      dispatch("deleteFav", {userId, video}).catch(e => console.log(e));
    } else {
      //add
      console.log("add", userId, video);
      dispatch("addFav", {userId, video}).catch(e => console.log(e));
    }
  },

  //DBへの追加
  addFav({commit, state, getters}, payload) {
    console.log("action:addFav", payload);

    // return;
    const {videoId, etag, title, imageUrl, description} = payload.video;
    this.$firestore.collection(`users/${payload.userId}/favs`).doc(videoId).set({
      videoId, etag, title, imageUrl, description,
      updateAt: Date.now(), //TODO:サーバータイムスタンプに変える
      // updateAt: firestore.FieldValue.serverTimestamp()
    })
      .then(() => {
        console.log("addLike", payload.video);
        // firestoreによるリアルタイム取得のため不要
      })
      .catch(err => {
        console.error('Error adding document: ', err);
      });
  },
  //DBからの削除
  deleteFav({commit, state, getters}, payload) {

    console.log("deleteLike", payload, 44);

    const videoId = payload.video.videoId;
    this.$firestore.collection(`users/${payload.userId}/favs`).doc(videoId).delete()
      .then(() => {
        //firestoreによるリアルタイム取得のため不要
        //ロード中マーク出す
      })
      .catch(err => {
        console.error('Error removing document: ', err);
      });
  },
  clear({commit}) {
    // console.log("[favs.js]clear:STOPLISTNER");
    commit('_stopListener');
    commit('clear');
  },
};
