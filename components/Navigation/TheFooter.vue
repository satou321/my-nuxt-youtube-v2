<template>
  <v-card
    width="100%"
    flat
    tile
    class="lighten-1  text-center "

  >
    <v-card-text>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4 "
        icon
      >
        <v-icon size="24px">{{ icon }}</v-icon>
      </v-btn>
    </v-card-text>

    <v-card-text class="pt-0">
      Gopher@Renee French.
      Phasellus feugiat arcu sapien,
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text class="black--text">
      {{ new Date().getFullYear() }} — <strong>MI</strong>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: "TheFooter",
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
      ],
    }),
  };
</script>
<style lang="sass" scoped>
  .v-card
    border-top: 3px solid var(--v-primary-base)

</style>
