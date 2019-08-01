<template>
  <v-card
    v-if="alreadyCheckedAuth&&!user"
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
      ...mapGetters("auth", ["alreadyCheckedAuth"]),
      ...mapGetters("userData", ["user"]),
    },
  };
</script>
