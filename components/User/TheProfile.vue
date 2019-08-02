<template>
  <v-card v-if="user"
          width="400"
          class="mx-auto" >
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img :src="user.photoURL" :alt="user.displayName">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline">{{user.displayName}}

          </v-list-item-title>

          <!--          <v-list-item-subtitle>something...</v-list-item-subtitle>-->
        </v-list-item-content>

      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list-item v-if="fav.length">
      <v-list-item-avatar size="64" tile>
        <v-img :src="fav[0].imageUrl">
          <template #placeholder>
            <v-layout
              align-center
              fill-height
              justify-center
              class="skeleton"
            >
            </v-layout>
          </template>
        </v-img>

      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <v-btn to="/fav" class="title" outlined x-large>
            お気に入り {{fav.length}}件
          </v-btn>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="toggleSignIn" color="primary" text>LOGOUT</v-btn>
      <!--      <v-btn text @click="menu = false">Cancel</v-btn>-->
      <!--      <v-btn color="primary" text @click="menu = false">Save</v-btn>-->
    </v-card-actions>
  </v-card>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex';
  import Avatar from "@/components/UI/Avatar";

  export default {
    name: 'TheProfile',
    middleware: "auth",
    components: {Avatar},
    data: () => ({
      title: '',
      imageUrl: '',
      isFormValid: true,
    }),
    computed: {
      ...mapGetters("userData", ['user']),
      ...mapGetters("fav", {fav: "all"}),
    },
    created() {
    },
    methods: {
      ...mapActions("auth", ["toggleSignIn"]),

      //   loadPostDetails(post, editPostDialog = true) {
      //     const {_id, title, imageUrl, categories, description} = post;
      //     this.postId = _id;
      //     this.title = title;
      //     this.imageUrl = imageUrl;
      //     this.selectedCategories = categories;
      //     this.description = description;
      //     editPostDialog ? this.editPostDialog = true : this.deletePostDialog = true;
      //   },
      //   onSubmit() {
      //     if (this.$refs.form.validate()) {
      //       this.$store.dispatch('updatePost', {
      //         postId: this.postId,
      //         userId: this.user._id,
      //         title: this.title,
      //         imageUrl: this.imageUrl,
      //         categories: this.selectedCategories,
      //         description: this.description,
      //       })
      //         .then(() => this.editPostDialog = false);
      //     }
      //   },
      //   deletePost() {
      //     this.$store.dispatch('deletePost', {postId: this.postId})
      //       .then(() => this.deletePostDialog = false);
      //   },
    },
  };
</script>
