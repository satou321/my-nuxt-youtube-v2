<template lang="pug">
  v-layout(column='', justify-center='', align-center='')
    v-flex(xs12='', sm8='', md6='')
      .text-xs-center
        logo
          vuetify-logo
      v-card
        v-card-title.headline
          | TOP/Users!
        v-card-text
          v-text-field(outlined solo v-model="userId")
          v-btn(@click="onLoadUser") Load User

          nuxt-link(to="/users") Users

          nuxt-child

        v-card-actions
          v-btn(color='primary', text='', nuxt='', to='/')
            | Continue

</template>

<script>
  import Logo from "@/components/Logo.vue";

  export default {
    components: {
      Logo,
    },
    data() {
      return {
        userId: "",
      };
    },

    methods: {
      onLoadUser() {
        this.$router.push("/users/" + this.userId);
      },
    },
    layout: "default",
  };
</script>

<style scoped>

</style>
