<template>
  <v-card
    v-if="!loadingAuth&&!user"
    name="loginModal"
    transition="pop-out"
    width="400"
    :closeBtn="false"
    height="auto"
  >
    <LoginTemplate/>
  </v-card>
</template>
<script>
  import LoginTemplate from "../../components/Login/LoginTemplate";
  import {mapGetters} from "vuex";

  export default {
    name: 'Login',
    components: {
      LoginTemplate,
    },

    computed: {
      ...mapGetters("auth", ["loadingAuth"]),
      ...mapGetters("userData", ["user"]),
    },
  };
</script>
