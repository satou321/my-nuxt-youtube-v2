<template>
  <v-container fill-height>
    <v-layout wrap column>
      <v-flex shrink>
        <v-text-field
          @keydown.esc="clear"
          v-model="searchText"
          placeholder="お気に入りを検索"
          prepend-inner-icon="fa fa-search"
          hide-details
          clearable
          solo></v-text-field>
      </v-flex>
      <v-flex>
        <ListView v-if="!isFetching" :items="getFilteredResults"
                  :noResultMsg="noResultMsg"
                  :reloadBtn="false"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ListView from "@/components/Videos/ListView";
  import {mapGetters} from "vuex";
  import _orderBy from "lodash.orderby";

  export default {
    middleware: ["auth"],
    components: {
      ListView,
    },
    // scrollToTop:true,
    data() {
      return {
        isNoSearchResult: false,
        searchResults: "",
        searchText: "",
        order: true,
      };
    },
    watch: {
      searchText: function (newValue, oldValue) {
        this.isNoSearchResult = newValue !== "" && !this.getFilteredResults.length;
      },
    },
    computed: {
      all() {
        return this.$store.getters["fav/all"];
      },
      noResultMsg() {
        return this.isNoSearchResult ? "見つかりませんでした" : "お気に入りはまだありません";
      },
      ...mapGetters("fav", ["isFetching"]),
      getFilteredResults() {
        if (!this.searchText) {
          return this.all;
        }
        const results = this.all.filter(x => {
          return x.title.toLowerCase().includes(this.searchText.toLowerCase());
        });
        return _orderBy(results, 'updateAt', this.order ? 'desc' : 'asc');
      },
    },
    methods: {
      clear() {
        this.searchText = "";
      },
    }

  };
</script>

<style scoped>

</style>
