<template>
  <!-- Profile Button -->
  <v-btn
    v-if="user"
    to="/profile"
    icon
    height="50"
    width="50"
    class="ml-2"
  >

    <!--    <v-badge overlap>-->
    <!--      <template #badge>-->
    <!--        <span>6</span>-->
    <!--      </template>-->
    <v-avatar>

      <v-img
        :src=user.photoURL
      >
        <template #placeholder>
          <v-layout
            align-center
            fill-height
            justify-center
            class="skeleton"
          >
            <!--            <v-progress-circular color="grey" indeterminate>-->
            <!--            </v-progress-circular>-->
          </v-layout>
        </template>
      </v-img>
    </v-avatar>

    <!--    </v-badge>-->
  </v-btn>
</template>

<script>
  import {mapGetters} from "vuex";
  // import DropDown from "./DropDown";

  export default {
    name: "Avatar",
    // components: {DropDown},
    computed: {
      ...mapGetters("userData", ["user"]),
    },
    methods: {
      start(ev) {
        console.log(ev.type);
        // this.isActive = true;
      },
    },
  };
</script>

<style scoped lang="stylus">
  .avatarSize
    height: $mainIconSize !important
    width: $mainIconSize !important


</style>
