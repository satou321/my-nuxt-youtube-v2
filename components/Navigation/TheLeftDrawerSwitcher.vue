<template>
  <v-app-bar-nav-icon
    class="!hidden-sm-and-up"
    @click.stop="toggleDrawer"
  >
  </v-app-bar-nav-icon>
</template>
<script>

  export default {
    name: "TheLeftDrawerSwitcher",
    methods: {
      toggleDrawer() {
        // console.log(1, "From Switcher");
        this.$store.dispatch('layout/tglDrawer', true).catch(e => console.log(e));
      },
    },
    computed: {},
  };
</script>

<style scoped lang="sass">
  html
    background-color: #eeeeee
    overflow-y: auto !important

  .container
    max-width: 1170px !important
    padding-left: 15px !important
    padding-right: 15px !important

  .toolbar
    z-index: 9

    &__link
      cursor: pointer
      transition: opacity .2s ease-in-out

      &:hover
        opacity: .8

  .v-list__tile__title
    overflow: visible !important

  .fade-enter-active,
  .fade-leave-active
    transition: opacity .2s ease-in-out

  .fade-enter-active
    transition-delay: .2s

  .fade-enter,
  .fade-leave-active
    opacity: 0

  .bounce
    animation: bounce 1s both

  @keyframes bounce
    0%, 20%, 53%, 80%, 100%
      transform: translate3d(0, 0, 0)

    40%, 43%
      transform: translate3d(0, -20px, 0)

    70%
      transform: translate3d(0, -10px, 0)

    90%
      transform: translate3d(0, -4px, 0)

  .search
    &__container
      position: relative
      min-width: 33%
      max-width: 480px

      .v-text-field
        max-width: 480px

    &__card
      left: 0
      max-width: 480px
      right: 0
      position: absolute !important
      top: 100%
      z-index: 9

</style>
