<template>
  <div class="row">
    <div class="col-6">
      <div class="card">
        <div class="card-body">Let's Make Some Memories!</div>
      </div>
    </div>
    <div class="col-3" v-for="p in Posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      Posts: computed(() => AppState.posts),
    };
  },
};
</script>
<style scoped>
</style>