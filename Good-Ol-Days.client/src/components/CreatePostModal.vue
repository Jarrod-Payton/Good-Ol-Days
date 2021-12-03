<template>
  <div class="modal fade" id="createPostModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Post Photo</p>
          <button
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="createPost">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <p class="S1">
                  Upload your file:
                  <input
                    class="inputupload mtop"
                    type="file"
                    accept="image/*"
                    id="inputfile"
                    @change="fileSelect"
                  />
                </p>
              </div>
              <div class="col-12">
                <p class="S1">
                  Post Title:
                  <input
                    type="text"
                    class="form-control border-0 mtop"
                    placeholder="Title your post ..."
                    v-model="postDetails.title"
                    required
                  />
                </p>
              </div>
              <div class="col-12">
                <p class="S1">
                  Post Description:
                  <input
                    type="text"
                    class="form-control border-0 mtop"
                    v-model="postDetails.description"
                    required
                  />
                </p>
              </div>
              <div class="col-12" v-if="activeChallenge.id">
                <p>
                  Is this post for the challenge?
                  <input
                    type="radio"
                    class="ms-3"
                    v-model="hasChallenge"
                    value="true"
                  />
                  Yes
                  <input
                    type="radio"
                    class="ms-2"
                    v-model="hasChallenge"
                    value="false"
                  />
                  No
                </p>
              </div>
              <img src="" alt="" class="img-fluid" id="image" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn"
              @click="upload"
              :disabled="submitting"
            >
              <h5 v-if="!submitting">Submit</h5>
              <i class="mdi mdi-spin mdi-loading" v-if="submitting" />
            </button>
            <button data-bs-dismiss="modal" class="btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { postService } from "../services/PostService"
import { Modal } from "bootstrap"
import { logger } from '../utils/Logger'
import { firebaseService } from '../services/FirebaseService'
export default {
  setup() {
    const postDetails = ref({})
    const hasChallenge = ref(Boolean)
    const files = ref([])
    const submitting = ref(false)
    return {
      hasChallenge,
      submitting,
      postDetails,
      files,
      activeAlbum: computed(() => AppState.activeAlbum),
      activeChallenge: computed(() => AppState.activeChallenge),
      fileSelect(e) {
        try {
          files.value = e.target.files
          logger.log('files ref value', files.value)
          const reader = new FileReader()
          reader.readAsDataURL(files.value[0])
          reader.onload = () => {
            document.getElementById('image').src = reader.result
          }
        } catch (error) {
          Pop.toast(error)
          submitting.value = false
        }
      },
      async createPost() {
        try {
          await postService.createPost(postDetails.value, hasChallenge.value)
          document.getElementById('image').src = ''
          postDetails.value = {}
          files.value = []
          Modal.getOrCreateInstance(document.getElementById("createPostModal")).toggle()
          submitting.value = false
          document.getElementById('inputfile').value = ""
        } catch (error) {
          Pop.toast(error)
          submitting.value = false

        }
      },
      async upload() {
        try {
          submitting.value = true
          logger.log('Submitting', submitting.value)
          const url = await firebaseService.upload(files.value[0], this.activeAlbum)
          postDetails.value.imgUrl = url
          logger.log(url)
          await this.createPost()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
}
</script>
<style scoped>
.inputupload {
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 0 !important;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
}
.mtop {
  margin-top: 5px;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>