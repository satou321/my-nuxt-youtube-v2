<template>
  <!-- Scroll Top Button -->
  <div class="btn-scrolltop " v-if="position > 500">

    <transition name="fade">
      <div class="btn-scrolltop" v-if="position > 500">
        <a class="button" v-scroll-to="'body'">
          <v-fab-transition>

            <v-btn fab right fixed class="bottom">
              <v-icon>arrow_upward</v-icon>
            </v-btn>
          </v-fab-transition>
        </a>
      </div>
    </transition>
  </div>
  <!-- /Scroll Top Button -->
</template>

<script>
  export default {
    name: "ScrollToTop",
    data() {
      return {
        position: 810,
      };
    },
    mounted() {
      // Vue.jsでトップに戻るボタンをつけてみる
      // https://www.memory-lovers.blog/entry/2019/07/07/093000
      if (!process.browser) {
        return;
      }
      this.$nextTick(() => {
        window.addEventListener("scroll", this.handleScroll);
      });
    },
    methods: {
      handleScroll() {
        this.position = window.scrollY;
      },
      scrollTop: function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
    },
  };
</script>

<style scoped lang="stylus">

  .bottom {
    /*position: fixed;*/
    /*right: 2%;*/
    /*bottom: 30px;*/
    /*width: 100px;*/
    /*height: 100px;*/
    z-index: 5;
    /*text-align: center;*/

  }
</style>
