<template>
  <v-card>
    <v-card-actions>
      <span class="headline">{{loginTitle}}</span>
      <v-spacer></v-spacer>
      <!--suppress HtmlUnknownTag -->
      <v-btn text depressed v-if="closeBtn">
        <!--suppress HtmlUnknownTag -->
      </v-btn>
    </v-card-actions>

    <!--suppress HtmlUnknownTag -->
    <v-divider></v-divider>

    <v-card-text v-if="user">
      <v-layout justify-center>

        <!--suppress HtmlUnknownTag -->
        <v-avatar>
          <img :src="user.photoURL">
        </v-avatar>
      </v-layout>
      <v-layout justify-center>
        <div>{{user.displayName}}さんとしてログインしています</div>
      </v-layout>
    </v-card-text>


    <v-layout justify-center pa-6>
      <!--suppress HtmlUnknownTag -->
      <!--      <v-avatar icon flat text title elevation-0 color="white">-->
      <v-btn x-large
             outlined
             @click="handleLogin"
             :loading="loadingAuth"
             :disabled="loadingAuth">
        <v-img :src="require('@/assets/img/search.svg')" width="32"
               left></v-img>
        <span class="pl-2">{{loginMsg}}</span>
      </v-btn>

    </v-layout>

  </v-card>
</template>
<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'LoginTemplate',
    components: {},
    data() {
      return {};
    },
    props: {
      closeBtn: true,
    },
    methods: {

      async handleLogin() {
        // 事前に取得していたパスへ移動
        await this.$store.dispatch("auth/toggleSignIn")
          .catch(e => {
            this.$toast.show("ログインできません");
            console.log(34, e);
          });
      },
    },
    computed: {
      loginTitle() {
        return this.user ? "ログアウト" : "ログイン";
      },
      loginMsg() {
        return this.user ? "ログアウト" : "Googleでログイン";
      },
      ...mapGetters("auth", ["loadingAuth"]),
      ...mapGetters("userData", ["user"]),

    },
  };
</script>
