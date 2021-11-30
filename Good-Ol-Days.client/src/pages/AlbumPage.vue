<template>
  <div class="row">
    <div class="col-md-6 order-md-2" v-if="!activeAlbum.hasChallenges">
      <Challenge />
    </div>
    <div class="col-md-6 order-md-1" v-if="posts1.length > 0">
      <div class="row">
        <div class="col-md-6" v-for="p in posts1" :key="p.id">
          <Post :post="p" />
        </div>
      </div>
    </div>
    <div class="col-md-3 order-md-3" v-for="p in posts2" :key="p.id">
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
      posts2: computed(() => AppState.posts.slice(0, 2)),
      posts1: computed(() => AppState.posts.splice(0, 2)),
      activeAlbum: computed(() => AppState.activeAlbum)
    };
  },
};
</script>
<style scoped>
</style>