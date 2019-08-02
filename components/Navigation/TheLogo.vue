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
      // negative margin for border-bottom:3px and margin:4px
      height: 68px - 3px - 4px

</style>
