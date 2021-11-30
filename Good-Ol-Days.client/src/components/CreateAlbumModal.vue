<template>
  <div class="modal fade" id="createAlbumModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="createAlbum">
          <div class="modal-header">
            <div class="modal-title">
              <h10>New Album</h10>
            </div>
          </div>
          <div class="modal-body">
            <h2>Hello</h2>
          </div>
          <div class="modal-footer">
            <button type="submit">Make Album</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { albumService } from "../services/AlbumService"
export default {
  setup() {
    return {
      async createAlbum() {
        albumService.setActiveAlbum()
      }
    }
  },
}
</script>
<style scoped>
h10 {
  font-size: 2vh;
}
</style>