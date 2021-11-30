<template>
  <div class="row mt-md-5 mt-2 m-0 p-0">
    <div class="col-md-6 order-md-2 p-0" v-show="!activeAlbum.hasChallenges">
      <Challenge />
    </div>
    <div class="col-md-6 order-md-1" v-if="posts1.length > 0">
      <div class="row">
        <div class="col-md-6 rotationanim" v-for="p in posts1" :key="p.id">
          <div class="item">
            <Post :post="p" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-md-3 rotationanim order-md-3"
      v-for="p in splicedPosts"
      :key="p.id"
    >
      <div class="item">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { albumService } from "../services/AlbumService";
import Pop from "../utils/Pop";
export default {
  setup() {
    const splicedPosts = ref([])
    const route = useRoute();
    watchEffect(() => {
      splicedPosts.value = [...AppState.posts]
      splicedPosts.value = splicedPosts.value.splice(2, AppState.posts.length)
    })
    onMounted(async () => {
      try {
        albumService.setActiveAlbum();
      } catch (error) {
        Pop.toast(error);
      }
    });
    return {
      splicedPosts,
      posts1: computed(() => AppState.posts.slice(0, 2)),
      activeAlbum: computed(() => AppState.activeAlbum)
    };
  },
};
</script>
<style scoped>
.item {
  width: 100%;
  display: inline-block;
  margin-top: 2rem;
}
.item .polaroid:before {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 1) .item {
  transform: scale(0.8, 0.8) rotate(7deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 1) .item .polaroid:before {
  transform: rotate(6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.4);
}
.rotationanim:nth-of-type(4n + 2) .item {
  transform: scale(0.8, 0.8) rotate(-5deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 2) .item .polaroid:before {
  transform: rotate(-6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.4);
}
.rotationanim:nth-of-type(4n + 4) .item {
  transform: scale(0.8, 0.8) rotate(3deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 4) .item .polaroid:before {
  transform: rotate(4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.3);
}
.rotationanim:nth-of-type(4n + 3) .item {
  transform: scale(0.8, 0.8) rotate(-3deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 3) .item .polaroid:before {
  transform: rotate(-4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.3);
}
.rotationanim:hover .item {
  filter: none;
  transform: scale(1, 1) rotate(0deg) !important;
  transition: all 0.35s;
}
.rotationanim:hover .item .polaroid:before {
  content: "";
  position: absolute;
  z-index: -1;
  transform: rotate(0deg);
  height: 90%;
  width: 90%;
  bottom: 0%;
  right: 5%;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  transition: all 0.35s;
}
</style>