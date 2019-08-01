<template>
  <v-container fill-height>
    <v-layout wrap column>
      <v-flex shrink>
        <v-text-field
          @keydown.esc="clear"
          @change="changeSearchText(searchText,$event)"
          placeholder="お気に入りを検索"
          prepend-inner-icon="search"
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
  import ListView from "../../components/Videos/ListView";
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
        noSearchResultMsg: "見つかりませんでした",
        noFavMsg: "お気に入りはまだありません",
        order: true,
      };
    },
    computed: {
      all() {
        return this.$store.getters["fav/all"];
      },
      noResultMsg() {
        return this.flag ? this.noSearchResultMsg : this.noFavMsg;
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
      changeSearchText(oldValue, newValue) {
        // console.log(3213, oldValue, newValue);
        this.searchText = newValue;
        //なにか検索し、かつ変化があり、かつ結果が0なら結果メッセージ変更
        const isSearch = this.searchText !== "";
        const valueChanged = (oldValue !== newValue);

        this.isNoSearchResult = isSearch && valueChanged && !this.getFilteredResults.length;
        console.log(this.isNoSearchResult);
      },
      clear() {
        this.searchText = "";
      },
    },

  };
</script>

<style scoped>

</style>
