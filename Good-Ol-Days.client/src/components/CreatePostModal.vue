<template>
  <div class="modal fade" id="createPostModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Post Photo</p>
        </div>
        <form @submit.prevent="createPost">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <p class="S1">
                  Post image URL:
                  <input
                    type="text"
                    v-model="postDetails.editable.imgUrl"
                    placeholder="Image Url ..."
                    class="form-control border-white"
                    required
                  />
                </p>
              </div>
              <div class="col-12">
                <p class="S1">
                  Post Title:
                  <input
                    type="text"
                    class="form-control border-white"
                    placeholder="Title your post ..."
                    v-model="postDetails.editable.title"
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
                    v-model="postDetails.editable.description"
                    required
                  />
                </p>
              </div>
              <div class="col-12">
                <p>
                  Is this post for the challenge?:
                  <input
                    type="radio"
                    v-model="postDetails.editable.challengeId"
                    value="true"
                  />
                  Yes
                  <input
                    type="radio"
                    v-model="postDetails.editable.challengeId"
                    value="false"
                  />
                  No
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn">Submit</button>
            <button data-bs-dismiss="modal" class="btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { postService } from "../services/PostService"
import { Modal } from "bootstrap"
export default {
  setup() {
    const postDetails = reactive({ editable: {} })
    return {
      postDetails,
      async createPost() {
        postService.createPost(postDetails.editable)
        postDetails.editable = {}
        Modal.getOrCreateInstance(document.getElementById("createPostModal")).toggle()
      },
      activeAlbum: computed(() => AppState.activeAlbum)
    }
  },
}
</script>
<style scoped>
</style>