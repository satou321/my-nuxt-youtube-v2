<template>
  <v-layout justify-end>
    <!--favorites-->


    <v-btn to="/fav"
           v-show="user"
           fab

           color="primary"
           class="myBtn"
    >
      <v-icon>far fa-heart</v-icon>
    </v-btn>

    <!--login-->
    <v-btn
      v-if="!user"
      @click="$modal.show('loginModal')"
      class="primary font-weight-bold py-0 my-0">
      ログイン
    </v-btn>

    <!--    <DropDown v-show="user && !xs">-->
    <!--    <DropDown v-show="user" >-->
    <!--      <v-btn v-on:touchstart.prevent="start">search</v-btn>-->

    <!--profile-->
    <Avatar v-show="!xs"></Avatar>

    <!--    </DropDown>-->
  </v-layout>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import Avatar from "@/components/UI/Avatar";

  export default {
    name: "NavUserMenu",
    components: {
      Avatar,
    },

    data: () => ({
      slotProps: "aaaaa",

      dialog: false,
    }),
    computed: {
      ...mapGetters("userData", ["user"]),

      xs() {
        if (process.browser) {
          return this.$vuetify.breakpoint.xs;
        } else {
          return false;
        }
      },
    },
    methods: {
      start(ev) {
        console.log(ev.type);
      },
      ...mapActions("auth", ["signOut"]),
    },
  };
</script>

<style lang="scss" scoped>
  .myBtn {
    //@include myBtn;
    width: 30px;
  }


</style>
