<template>
  <div class="modal fade" id="createAlbumModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="uploadCoverImg">
          <div class="modal-header">
            <div class="modal-title f-18">
              <p>New Album</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <p class="S1">
                  Upload Album Cover <i>(Optional)</i>
                  <input
                    class="inputupload mtop"
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="fileSelect"
                  />
                </p>
              </div>
              <div class="col-12">
                <p class="S1 f-14">Album name:</p>
                <input
                  type="text"
                  class="albumName form-control border-0"
                  placeholder="Name your album ..."
                  v-model="albumDetails.editable.title"
                  maxlength="20"
                  required
                />
              </div>
              <div class="col-12">
                <p class="S1 mt-4">
                  Enable week challenges?
                  <input
                    type="radio"
                    class="ms-3"
                    v-model="albumDetails.editable.hasChallenges"
                    :value="true"
                  />
                  Yes
                  <input
                    type="radio"
                    class="ms-3"
                    v-model="albumDetails.editable.hasChallenges"
                    :value="false"
                    required
                  />
                  No
                </p>
              </div>
            </div>
            <img src="" alt="" class="img-fluid" id="image" />
          </div>
          <div class="modal-footer">
            <button class="btn" type="submit" :disabled="submitting">
              <h5 class="font" v-if="!submitting">Add Album</h5>
              <i class="mdi mdi-spin mdi-loading" v-if="submitting" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity"
import { albumService } from "../services/AlbumService"
import { logger } from "../utils/Logger"
import { useRouter } from "vue-router"
import { Modal } from "bootstrap"
import { firebaseService } from "../services/FirebaseService"
export default {
  setup() {
    const submitting = ref(false)
    const albumDetails = reactive({ editable: {} })
    const files = ref([])
    const router = useRouter()
    return {
      albumDetails,
      submitting,
      async createAlbum() {
        try {
          submitting.value = true
          const newPost = await albumService.createAlbum(albumDetails.editable)
          router.push({
            name: "Album",
            params: { albumId: newPost.id }
          })
          Modal.getOrCreateInstance(document.getElementById("createAlbumModal")).toggle()
          albumDetails.editable = {}
          submitting.value = false
        } catch (error) {
          logger.log(error)
        }
      },
      fileSelect(e) {
        files.value = e.target.files
        logger.log('files ref value', files.value)
        const reader = new FileReader()
        reader.readAsDataURL(files.value[0])
        reader.onload = () => {
          document.getElementById('image').src = reader.result
        }
      },
      async uploadCoverImg() {
        try {
          submitting.value = true
          if (!files.value[0]) {
            await this.createAlbum()
          }
          else {
            const url = await firebaseService.upload(files.value[0], albumDetails.editable)
            albumDetails.editable.coverImg = url
            logger.log(url)
            await this.createAlbum()
          }
        } catch (error) {
          logger.error(error)
          submitting.value = false
        }
      }
    }
  },
}
</script>
<style scoped>
.S1 {
  font-size: 2vh;
  font-family: "Saira Condensed", sans-serif;
}
.buttonscss {
  background-color: #4ac26d !important;
  margin-top: 2vh;
  margin-right: 3vh;
  color: white;
  font-size: 2.2vh;
  font-family: "Saira Condensed", sans-serif;
  letter-spacing: 0.4px;
}
.inputupload {
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 0 !important;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
}
</style>