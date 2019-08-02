<template>

      <TheProfile></TheProfile>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Avatar from "@/components/UI/Avatar";
  import TheProfile from "@/components/User/TheProfile";

  export default {
    name: 'Profile',
    middleware: "auth",
    components: {TheProfile, Avatar},
    data: () => ({
      title: '',
      imageUrl: '',
      isFormValid: true,
    }),
    computed: {
      ...mapGetters("userData", ['user']),
      ...mapGetters("fav", {fav: "all"}),
    },
    created() {
    },
    methods: {
      ...mapActions("auth", ["toggleSignIn"]),
    },
  };
</script>

<style lang="sass" scoped>
  .user
    &__text
      border-bottom: 1px solid lighten(#9e9e9e, 20%)
      font-size: 16px
      font-weight: 300
      margin-bottom: 0
      padding: .5rem 0

      &:last-of-type
        border-bottom: none
        padding-bottom: 0
        padding-top: .5rem
</style>
