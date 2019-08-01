<template>
  <v-dialog v-model="dialogVisible" hide-overlay persistent>
    <v-container fill-height>
      <v-layout justify-center align-center>
        <!--suppress HtmlUnknownTag -->
        <v-progress-circular
          indeterminate
          :width="6"
          :size="50"
          color="primary">
        </v-progress-circular>
        <br>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
  import {mapGetters} from "vuex";

  export default {
    name:"Loading",
    data: () => ({
      loading: false,
    }),
    props: {
      value: {type: Boolean, default: false},
      message: {type: String, default: "Loading..."},
      progressColor: {type: String, default: 'purple'},
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.isAuthLoading;
        },
        set: function (val) {
        },
      },
      ...mapGetters("loading", ["isAuthLoading"]),
    },
  };
</script>

<style scoped lang="stylus">
  ::v-deep .v-dialog {
    box-shadow: none;
  }
</style>
