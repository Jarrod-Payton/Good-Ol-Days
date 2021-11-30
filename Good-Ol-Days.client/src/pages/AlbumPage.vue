<template>
  <div class="row">
    <div class="col-md-6" v-if="!activeAlbum.hasChallenges">
      <Challenge />
    </div>
    <div class="col-3" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { albumService } from "../services/AlbumService";
import Pop from "../utils/Pop";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        albumService.setActiveAlbum();
      } catch (error) {
        Pop.toast(error);
      }
    });
    return {
      posts: computed(() => AppState.posts),
      activeAlbum: computed(() => AppState.activeAlbum),
    };
  },
};
</script>
<style scoped>
</style>