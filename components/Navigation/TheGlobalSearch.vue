<template>
  <v-flex class="mx-3">

    <v-btn class="hidden-sm-and-up" icon
           @click="tglDropdownSearch">
      <v-icon size="30" color="#757575">
        {{stateDropdownSearch?'fa fa-times':'fa fa-search'}}
      </v-icon>
    </v-btn>


    <v-text-field
      ref="textField"
      class="xs"
      v-show="{stateDropdownSearch}"
      :class="{show:stateDropdownSearch}"
      v-model="searchText"
      @click:prepend-inner="handleSearch"
      @keyup.enter="handleSearch"
      @keydown.esc="clear"
      :placeholder="$vuetify.lang.t('$vuetify.search')"
      prepend-inner-icon="fas fa-search"
      hide-details
      clearable
      solo
    ></v-text-field>

  </v-flex>
</template>

<script>
  export default {
    name: "GlobalSearch",
    data() {
      return {
        stateDropdownSearch: false,
        clicked: false,
        searchText: "",
        model: 'I\'m a text field',
        placeholder: '',
        shaped: false,
        outlined: true,
        rounded: true,
        solo: false,
        singleLine: true,
        filled: false,
        clearable: true,
        persistentHint: false,
        loading: false,
        text: false,
        counterEn: false,
        counter: 0,
      };
    },
    created() {
      if (process.browser) {
        document.addEventListener('click', this.close);
        document.addEventListener('touchstart', this.close);
      }
    },


    beforeDestroy() {
      if (process.browser) {
        document.removeEventListener('click', this.close);
        document.removeEventListener('touchstart', this.close);
      }
    },

    methods: {
      clear() {
        if (this.searchText === "") {
          this.stateDropdownSearch = false;
        }
        this.searchText = "";
      },
      handleSearch() {
        console.log(32, "handlerSearch");
        this.$store.dispatch("search/searchVideos", this.searchText).catch(e => console.log(e));

        this.stateDropdownSearch = false;
        this.searchText = "";
        $nuxt.$router.push("/");
      },
      tglDropdownSearch() {
        //toggle open/close
        this.stateDropdownSearch = !this.stateDropdownSearch;
        //focus
        if (this.stateDropdownSearch) {
          this.$nextTick(() => {
            this.$refs.textField.focus();
          });
        }
      },
      close(e) {
        if (!this.$el.contains(e.target)) {
          this.stateDropdownSearch = false;
        }
      },
    },
  };
</script>

<style lang="stylus" scoped>

  //600 1024 1440-16 1920-16
  xsAndUp()
    @media screen and (min-width: 600px)
      {block}

  xsOnly()
    @media screen and (max-width: 599px)
      {block}

  //xsのときはグローバル検索をabsoluteにする
  .xs.v-input
    position:initial
    +xsOnly()
      display: none
      position: absolute
      top: 68px;
      left: 0;
      right: 0;
      /*margin: auto;*/
      z-index: 2;
      width: 100%;
      padding: 0 15px !important;

  //ボタン押されたら強制表示
  .show {
    display: block !important;
  }

  ::v-deep .v-input {
    background-color: transparent;
  }

  ::v-deep .my-input.v-input, .v-input__slot {
    overflow: hidden;
    border: 1px solid #9b9b9b !important;
    box-shadow: none !important;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

</style>
