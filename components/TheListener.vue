<template></template>
<script>
  import {mapGetters} from "vuex";

  export default {
    name: "TheListener",
    async beforeMount() {
      /* ★ onAuthStateChanged */
      this.$store.dispatch("auth/authListener", cb).catch(e => console.log(5454, e));
      const vm = this;

      /* ★ onAuthStateChanged callbacks  */
      function cb(user) {
        const uid = user ? user.uid : false;
        //fav
        vm.$store.dispatch("fav/favListenerByUserId", uid).catch(e => console.log(4325, e));
        //userData
        vm.$store.dispatch("userData/updateUser", user).catch(e => console.log(73, e));
      }
    },
    computed: {
      ...mapGetters("userData", ["user"]),
      ...mapGetters("auth", ["loadingAuth", "isFirstPageLoad"]),
    },
  };
</script>
