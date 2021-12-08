<template >
  <main class="container-fluid background">
    <div class="row">
      <NavigationBar />
    </div>
    <div class="row" :class="{ scrollbar: $route.name != 'Landing' }">
      <router-view />
    </div>
  </main>
  <footer class="background d-flex justify-content-center">
    <ProfileOffCanvas :account="account" />
    <CreatePostModal />
    <PictureModal :posts="posts" />
    <VideoModal :posts="posts" />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import { useRoute } from "vue-router"
export default {
  name: 'App',
  setup() {
    const route = useRoute()

    return {
      route,
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Saira+Condensed&display=swap");
.background {
  background-image: url(https://images.unsplash.com/photo-1541138858526-9f296df15693?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80);
  background-size: cover;
  background-repeat: repeat-y;
}
p {
  font-family: "Saira Condensed", sans-serif;
}
.scrollbar {
  overflow-y: scroll;
  height: 82vh;
}
.scrollbar::-webkit-scrollbar {
  width: 7px;
}
.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2ebd;
  width: 7px;
  border-radius: 7px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 7px;
}
</style>
