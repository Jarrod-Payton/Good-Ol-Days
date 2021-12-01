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
            <div class="row">
              <div class="col-12">
                <h10>Album name:</h10>
                <input
                  type="text"
                  class="albumName form-control border-white"
                  placeholder="Name your album ..."
                  v-model="albumDetails.editable.title"
                  required
                />
              </div>
              <div class="col-12">
                <h10>Enable week challenges?</h10>
                <input
                  type="radio"
                  v-model="albumDetails.editable.hasChallenges"
                  :value="true"
                />
                <h10>Yes</h10>
                <input
                  type="radio"
                  v-model="albumDetails.editable.hasChallenges"
                  :value="false"
                />
                <h10>No</h10>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="buttonscss btn" type="submit">Make Album</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity"
import { albumService } from "../services/AlbumService"
import { logger } from "../utils/Logger"
import { useRouter } from "vue-router"
import { Modal } from "bootstrap"
export default {
  setup() {
    const albumDetails = reactive({ editable: {} })
    const router = useRouter()
    return {
      albumDetails,
      async createAlbum() {
        try {
          const newPost = await albumService.createAlbum(albumDetails.editable)
          router.push({
            name: "Album",
            params: { albumId: newPost.id }
          })
          Modal.getOrCreateInstance(document.getElementById("createAlbumModal")).toggle()
          albumDetails.editable = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
}
</script>
<style scoped>
h10 {
  font-size: 2vh;
}
.buttonscss {
  background-color: #4ac26d;
  margin-top: 2vh;
  margin-right: 3vh;
  color: white;
  font-size: 2.2vh;
  font-family: "Saira Condensed", sans-serif;
  letter-spacing: 0.4px;
}
</style>