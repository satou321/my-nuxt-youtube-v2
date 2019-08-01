<template lang="pug">
  #logoContainer(class="")
    #logoInner
      nuxt-link(to="/" exact)
        img(src="@/assets/img/logo.png")
</template>

<script>

  export default {
    name: "TheLogo",
  };
</script>

<style scoped lang="sass">
  #logoContainer
    width: 58px

    img
      padding-top: 10px
      width: 58px

  #logoInner
      overflow: hidden
      height: 68px - 11px

</style>
