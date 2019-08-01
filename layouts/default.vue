<template lang="pug">
  //v-app-bar(style="background:#F2F2F2")
  v-app
    v-app-bar(app fixed flat class="border")
      TheHeader
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center )
          nuxt
    v-footer(app padless absolute)
      TheFooter
    ScrollToTop
    TheLeftDrawer
    LoginModal
    Loading
    TheListener

</template>

<script>
  import Loading from "@/components/Loading";
  import TheHeader from "@/components/Navigation/TheHeader";
  import TheFooter from "@/components/Navigation/TheFooter";
  import TheLeftDrawer from "@/components/Navigation/TheLeftDrawer";
  import TheLeftDrawerSwitcher
    from "@/components/Navigation/TheLeftDrawerSwitcher";
  import LoginModal from "@/components/Login/LoginModal";
  import ScrollToTop from "@/components/UI/ScrollToTop";
  import TheListener from "@/components/TheListener";

  export default {
    components: {
      TheListener,
      TheHeader,
      TheFooter,
      TheLeftDrawer,
      TheLeftDrawerSwitcher,
      LoginModal,
      ScrollToTop,
      Loading,
    },
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/',
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire',
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
      };
    },


  };
</script>
