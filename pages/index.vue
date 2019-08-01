<template>
  <v-container fill-height>
    <v-layout wrap column>
      <template v-if="error.isError">
        {{error.message}}
      </template>
      <template v-else>
        <ListView :items="all" :no-result-msg="noResultMsg" :reload-btn="true"/>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from "vuex";
  import ListView from "@/components/Videos/ListView";

  export default {
    components: {
      ListView
    },
    computed: {
      // flow.2
      ...mapGetters("youtubeVideos", ["error", "isLoading", "all"]),
      noResultMsg: () => "動画が見つかりません",
    },
  };
</script>
