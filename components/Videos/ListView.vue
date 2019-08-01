<template>
  <v-container text-xs-center ma-0 pa-0>
    <template v-if="!items.length">
      <v-layout justify-center>

        <v-card flat  color="transparent" height="100%"
                class="text-align-center justify-center" style="background-color: yellow !important;">
          <v-card-title text-align-center v-if="!isLoading"  style="">
            {{noResultMsg}}
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn @click="reload"
                   v-if="reloadBtn&&!hasMore"
                   class="primary ma-5"
                   :loading="isLoading"
                   :disabled="isLoading">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>


    </template>

    <template v-else>
      <v-container grid-list-lg mt-0 pt-0 px-0 pb-0>
        <v-layout row wrap>
          <!-- List -->
          <One
            v-for="(item,index) in items"
            :key="`${item.videoId + index}`"
            :item="item"
            :index="index"
          />
        </v-layout>
        <v-layout align-center justify-center pa-3 ma-3>
          <v-btn class="primary" @click="showMore"
                 v-if="hasMore"
                 :loading="isLoading"
                 :disabled="isLoading"
          >
            {{ $vuetify.lang.t('$vuetify.showMore') }}
          </v-btn>
        </v-layout>
      </v-container>
    </template>

  </v-container>

</template>

<script>

  import One from "@/components/Videos/One";
  import {mapGetters} from "vuex";

  export default {
    components: {
      One,
    },
    // scrollToTop: true,
    props: {
      items: {
        type: Array,
        required: true,
      },
      noResultMsg: {
        type: String,
        required: true,
      },
      reloadBtn: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapGetters("youtubeVideos", ["isLoading"]),
      hasMore() {
        if (this.isHome) {
          return this.$store.getters["youtubeVideos/hasMore"];
        } else {
          return false;
        }
      },
      isHome() {
        if (this.$nuxt.$route.path === "/") {
          return true;
        }
      },
    },
    methods: {
      showMore() {
        if (this.isHome) {
          return this.$store.dispatch("youtubeVideos/showMore").catch(e => console.log("youtubeVideos/showMore",e));
        } else {
          /*　TODO:未実装。お気に入りは常に全取得*/
          return false;
          // return this.$store.dispatch("fav/showMore");
        }
      },
      reload() {
        this.$store.dispatch("youtubeVideos/reload").catch(e => console.log(e));
      },
    },
  };
</script>

<style scoped>

</style>
