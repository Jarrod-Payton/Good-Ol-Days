<template>
  <div class="PictureModal">
    <div
      class="modal fade"
      id="picture-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0 rounded-0 transparent">
          <div class="modal-body d-flex justify-content-center">
            <div class="card">
              <div class="text-end py-1">
                <button
                  type="button"
                  class="btn-close small"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="d-flex justify-content-center">
                <img class="img-fluid" :src="activePost.imgUrl" alt="" />
              </div>
              <div class="text-center d-flex">
                <p class="m-0 pb-2 pt-3 w-100 title">{{ activePost.title }}</p>
                <div class="text-end align-self-center">
                  <button
                    v-show="
                      posts.creatorId === account.id ||
                      activeAlbum.creatorId === account.id
                    "
                    title="Delete this picture"
                    @click="deletePost"
                    class="btn delete m-0"
                  >
                    <i class="mdi mdi-24px me-2 mdi-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { postService } from "../services/PostService"
import { Modal } from "bootstrap"
import Pop from "../utils/Pop"
export default {
  props: {
    posts: { type: Object }
  },
  setup() {
    return {
      async deletePost() {
        if (await Pop.confirm()) {
          await postService.deletePost()
          Modal.getOrCreateInstance(document.getElementById("picture-modal")).toggle()
          Pop.toast('Picture deleted!', 'success')
        }
      },
      activePost: computed(() => AppState.activePost),
      account: computed(() => AppState.account),
      activeAlbum: computed(() => AppState.activeAlbum)
    }
  }
}
</script>


<style lang="scss" scoped>
@font-face {
  font-family: "MyWebFont";
  src: url("../assets/fonts/Stickynotes-ywLPd.otf") format("woff");
}
.title {
  font-family: "MyWebFont";
  font-size: 4vh;
}
.transparent {
  background-color: rgba(255, 255, 255, 0) !important;
}
.card {
  padding-left: 2vh;
  padding-right: 2vh;
  border-radius: 0;
}
.blue {
  color: #1e90ff;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.modal-dialog {
  margin-top: 0;
  margin-bottom: 0;
}
.img-fluid {
  max-height: 80vh;
}
.delete {
  color: #999999;
  border-color: #999999;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 0px;
  padding-left: 6px !important;

  margin-right: 4vh;
  margin-bottom: 2vh;
}
.delete:hover {
  background-color: red;
  color: white;
  border-color: red;
}
</style>