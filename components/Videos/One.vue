<template>
  <v-flex xs12 sm6 lg4 xl3>
    <v-flex text tile>
      <v-hover>
        <v-card
          slot-scope="{hover}"
          :class="`elevation-${hover?4:1}`"
        >
          <a :href="youtubeUrl">
            <v-img :src="item.imageUrl" width="100%" aspect-ratio="1.777">
              <template #placeholder>
                <v-layout
                  align-center
                  fill-height
                  justify-center
                  class="skeleton ma-0"
                >
                </v-layout>
              </template>
            </v-img>
          </a>

          <v-card-title>
            <div class="text-truncate ">
              <!--              <v-chip outlined>{{index + 1}}</v-chip>-->
              {{ item.title }}
            </div>
          </v-card-title>
          <!--          <v-card-text class="text description">-->
          <!--            {{ item.description }}-->
          <!--          </v-card-text>-->
          <v-card-actions>
            <v-layout align-center justify-end v-if="user">
              <v-btn icon>
                <v-icon :color="favColor"
                        @click="tglFav">favorite
                </v-icon>
              </v-btn>
              <!--              <v-btn icon>-->
              <!--                <v-icon>bookmark</v-icon>-->
              <!--              </v-btn>-->
              <!--              <v-btn icon>-->
              <!--                <v-icon>share</v-icon>-->
              <!--              </v-btn>-->
            </v-layout>
          </v-card-actions>

        </v-card>
      </v-hover>
    </v-flex>

  </v-flex>


</template>

<script>
  import _debounce from "lodash.debounce";
  import {mapGetters} from "vuex";

  export default {
    name: 'One',
    component: {},
    props: {
      item: Object,
      index: Number,
    },

    computed: {
      youtubeUrl() {
        if (this.item.videoId !== "") {
          return 'https://www.youtube.com/watch?v=' + this.item.videoId;
        }
      },
      favColor() {
        return this.isFavById ? "primary" : "grey";
      },
      isFavById() {
        return this.$store.getters["favs/isFavById"](this.item.videoId);
      },
      ...mapGetters("userData", ["user"]),
    },
    methods: {
      tglFav: _debounce(function (e) {
        this.$store.dispatch('favs/tglFav', {
          video: this.item,
          isFav: this.isFavById,
        }).catch(e => console.log(e));
      }, 200),
    },
  };
</script>
