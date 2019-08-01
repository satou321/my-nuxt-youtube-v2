<template lang="pug">
  v-layout(justify-center align-center)
    v-toolbar-title
      TheLogo
    GlobalSearch
    NavUserMenu
    TheLeftDrawerSwitcher

</template>

<script>
  import {mapGetters} from "vuex";

  // import NavUserMenu from "./NavUserMenu";
  // import GlobalSearch from "./GlobalSearch";
  // import TheLogo from "./TheLogo";
  // import TheLeftDrawerSwitcher from "./TheLeftDrawerSwitcher";

  export default {
    components: {
      // TheLeftDrawerSwitcher,
      // TheLogo,
      // NavUserMenu, GlobalSearch,
    },
    name: "TheHeader",

    async beforeMount() {
      //★
      this.$store.dispatch("auth/userListener").catch(e => console.log("dispatch userListener",e));
    },
    computed: {
      ...mapGetters("userData", ["user"]),
    },
  };
</script>

<style scoped lang="stylus">
  .v-layout
    border-bottom:3px solid $baseColor
</style>
