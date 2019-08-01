<template lang="pug">
  v-layout(justify-center align-center)
    v-toolbar-title
      TheLogo
    GlobalSearch
    NavUserMenu
    TheLeftDrawerSwitcher

</template>

<script>

  import NavUserMenu from "./TheUserMenu";
  import GlobalSearch from "./TheGlobalSearch";
  import TheLogo from "./TheLogo";
  import TheLeftDrawerSwitcher from "./TheLeftDrawerSwitcher";

  export default {
    name: "TheHeader",
    components: {
      TheLeftDrawerSwitcher,
      TheLogo,
      NavUserMenu, GlobalSearch,
    },
  };
</script>

<style scoped lang="stylus">
  .v-layout
    border-bottom:3px solid var(--v-primary-base);
</style>
