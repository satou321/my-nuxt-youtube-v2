<template>
  <!--suppress HtmlUnknownTag -->
  <v-navigation-drawer
    app
    temporary
    v-model="drawer"
  >
    <v-list-item class="profile">


      <v-layout v-if="user" @click="routerPush('/profile')" class="py-2">
        <v-list-item-avatar>
          <img :src="user.photoURL">
        </v-list-item-avatar>
        <v-list-item-title>
          {{user.displayName}}
        </v-list-item-title>
      </v-layout>

      <v-btn icon @click.stop="drawer=false">
        <v-icon>fa fa-angle-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-item-group
        v-model="group">

        <v-list-item
          v-for="(button,index) in menuButtons"
          :key="button.title"
          :disabled="button.login"
          @click="handleClick(index)"
        >
          <v-list-item-action>
            <v-icon :color="button.color">{{ button.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="button.title">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>

    </v-list>

  </v-navigation-drawer>
</template>
<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "TheLeftDrawer",
    data() {
      return {
        group: null,
      };
    },
    computed: {
      ...mapGetters("userData", ["user"]),
      ...mapGetters("fav", {userFavorites: "all"}),
      loginMsg() {
        return this.user ? "ログアウト" : "ログイン";
      },

      menuButtons() {
        const lock = "fa fa-lock";
        return [
          {
            title: "Home",
            icon: "fa fa-home",
            login: false,
            click: "/",
          },

          {
            title: "お気に入り",
            icon: this.user ? "fa fa-heart" : lock,
            color: this.user ? "primary" : "",
            badgeLength: this.userFavorites?this.userFavorites:0,
            login: !this.user,
            click: "/fav",
          },
          {
            title: this.user ? "ログアウト" : "ログイン",
            icon: this.user ? "fas fa-sign-out-alt" : "far fa-user",
            login: false,
            click: this._toggleSignIn,
          },
        ];
      },
      /* https://stackoverflow.com/questions/48388834/vuetify-navigation-drawer-works-once-then-stops */
      //TODO:根本的に修正する
      drawer: {
        get() {
          return this.$store.state.layout.drawer;
        },
        set(val) {
          if (val !== this.$store.state.drawer) {
            this.$store.dispatch("layout/tglDrawer", val).catch(e => console.log("toggleError", e));
          }
        },
      },
    },

    methods: {
      ...mapActions("auth", ["toggleSignIn"]),
      toProfile() {
        $nuxt.$router.push("/profile");
      },
      toggleDrawer() {
        this.$store.dispatch('layout/tglDrawer').catch(e => console.log(e));
      },
      handleClick(index) {
        const click = this.menuButtons[index].click;
        if (typeof click === "function") {
          this.drawer = false;

          this.menuButtons[index].click();
        } else {
          this.routerPush(click);
          // if (typeof click === "string") {
          //   if ($nuxt.$route.query.redirect_uri) {
          //     const redirectUri = decodeURIComponent($nuxt.$route.query.redirect_uri);
          //     console.log(222, redirectUri, click);
          //     if (redirectUri !== click) {
          //       console.log("redirect!");
          //       $nuxt.$router.push(click);
          //     }
          //   } else if (click !== $nuxt.$route.path) {
          //     console.log("リダイレクトはなし。ルート異るので移動", click, $nuxt.$route.path);
          //     $nuxt.$router.push(click);
          //   }
          // }
        }
      },
      routerPush(to) {
        this.drawer = false;
        console.log(typeof to);
        if (typeof to === "string") {
          if ($nuxt.$route.query.redirect_uri) {
            const redirectUri = decodeURIComponent($nuxt.$route.query.redirect_uri);
            console.log(222, redirectUri, to);
            if (redirectUri !== to) {
              console.log("redirect!");
              $nuxt.$router.push(to);
            }
          } else if (to !== $nuxt.$route.path) {
            console.log("リダイレクトはなし。ルート異るので移動", to, $nuxt.$route.path);
            $nuxt.$router.push(to);
          }
        }
      },
      _toggleSignIn() {
        // this.$modal.show("loginModal");
        this.toggleSignIn().catch(e => console.log(32, e));
      },

    },
  };
</script>

<style scoped lang="stylus">
  .profile {
    cursor: pointer;
  }

  .hello {
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }

  html {
    background-color: #eeeeee;
    overflow-y: auto !important;
  }

  .container {
    max-width: 1170px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
  }

  .toolbar {
    z-index: 9;

    &__link {
      cursor: pointer;
      transition: opacity .2s ease-in-out;

      &:hover {
        opacity: .8;
      }
    }
  }

  .v-list__tile__title {
    overflow: visible !important;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s ease-in-out;
  }

  .fade-enter-active {
    transition-delay: .2s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .bounce {
    animation: bounce 1s both;
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }

    40%, 43% {
      transform: translate3d(0, -20px, 0);
    }

    70% {
      transform: translate3d(0, -10px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  .search {
    &__container {
      position: relative;
      min-width: 33%;
      max-width: 480px;

      .v-text-field {
        max-width: 480px;
      }
    }

    &__card {
      left: 0;
      max-width: 480px;
      right: 0;
      position: absolute !important;
      top: 100%;
      z-index: 9;
    }
  }
</style>
