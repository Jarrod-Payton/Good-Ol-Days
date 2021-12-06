<template>
  <!-- Create a new Album Modal v -->
  <div class="modal fade" id="createAlbumModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="uploadCoverImg">
          <div class="modal-header">
            <div class="modal-title f-18">
              <p>New Album</p>
            </div>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <!-- Upload File from computer v  -->
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
                <!-- Upload File from computer ^  -->
              </div>
              <!--This DIV has just the basic form set up for the information required to make a album-->
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
                    type="checkbox"
                    class="ms-3"
                    v-model="albumDetails.editable.hasChallenges"
                    :value="true"
                  />
                  Yes
                </p>
              </div>
            </div>
            <!--Is used to add a nice buffer between the bottom of the form and the last bit of input-->
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
  <!-- Create a new Album Modal ^ -->
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
    //Variable to make the submit button disapear and become disabled when set to true and is set to true at the begging of each function and set back to false at the end
    const submitting = ref(false)
    //Form used for information
    const albumDetails = reactive({ editable: {} })
    //FireBase variable to be set to the image selected
    const files = ref([])
    //Used to grab the url info
    const router = useRouter()
    return {
      albumDetails,
      submitting,
      async createAlbum() {
        try {
          //Makes the album and sets the submitting to true so the user cannot spam click submit
          submitting.value = true
          const newPost = await albumService.createAlbum(albumDetails.editable)
          //Pushes you to the album page just created
          router.push({
            name: "Album",
            params: { albumId: newPost.id }
          })
          //Closes the modal behind you
          Modal.getOrCreateInstance(document.getElementById("createAlbumModal")).toggle()
          //Sets the modal info back to empty
          albumDetails.editable = {}
          submitting.value = false
        } catch (error) {
          logger.log(error)
        }
      },

      //The process of file selection and upload are nearly identical, full comment documentation
      //in the CreatePostModal.vue component
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
            const url = await firebaseService.uploadCoverImg(files.value[0], albumDetails.editable)
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