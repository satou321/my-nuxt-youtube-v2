<template>
  <modal name="loginModal"
         transition="pop-out"
         :max-width="400"
         :adaptive="true"
         height="auto"
  >
    <LoginTemplate :closeBtn="true"/>

  </modal>
</template>
<script>
  import LoginTemplate from "./LoginTemplate";

  const MODAL_WIDTH = 600;

  export default {
    name: 'LoginModal',
    components: {
      LoginTemplate,
    },
    data() {
      return {
        modalWidth: MODAL_WIDTH,
      };
    },
    created() {
      if (process.browser) {
        this.modalWidth = window.innerWidth < MODAL_WIDTH
          ? MODAL_WIDTH / 2
          : MODAL_WIDTH;
      }
    },

    methods: {},
    computed: {},
  };
</script>
