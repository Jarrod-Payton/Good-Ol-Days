<template>
  <div class="modal fade" id="createPostModal">
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-title">
          <h1>Add To Album</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      activeAlbum: computed(() => AppState.activeAlbum)
    }
  },
}
</script>
<style scoped>
</style>