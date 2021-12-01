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
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  @change="fileSelect"
                />
              </div>
              <div class="col-12">
                <p class="S1">
                  Post Title:
                  <input
                    type="text"
                    class="form-control border-white"
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
                    class="form-control border-white"
                    v-model="postDetails.description"
                    required
                  />
                </p>
              </div>
              <div class="col-12">
                <p>
                  Is this post for the challenge?:
                  <input
                    type="radio"
                    v-model="postDetails.challengeId"
                    value="true"
                  />
                  Yes
                  <input
                    type="radio"
                    v-model="postDetails.challengeId"
                    value="false"
                  />
                  No
                </p>
              </div>
              <img src="" alt="" class="img-fluid" id="image" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" @click="upload">Submit</button>
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
    const files = ref([])
    return {
      postDetails,
      files,
      activeAlbum: computed(() => AppState.activeAlbum),
      fileSelect(e) {
        files.value = e.target.files
        logger.log('files ref value', files.value)
        const reader = new FileReader()
        reader.readAsDataURL(files.value[0])
        reader.onload = () => {
          document.getElementById('image').src = reader.result
        }
      },
      async createPost() {
        try {
          postService.createPost(postDetails.value)
          document.getElementById('image').src = ''
          postDetails.value = {}
          files.value = []
          Modal.getOrCreateInstance(document.getElementById("createPostModal")).toggle()

        } catch (error) {
          logger.error(error)
        }
      },
      async upload() {
        try {
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
</style>