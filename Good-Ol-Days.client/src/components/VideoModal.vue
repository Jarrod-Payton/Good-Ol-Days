<template>
  <div class="PictureModal">
    <div
      class="modal fade modal-fullscreen-xxl-down"
      id="video-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content border-0 rounded-0 transparent">
          <div
            class="modal-body d-flex justify-content-center align-items-center"
          >
            <div class="card d-flex justify-content-center filmstrip">
              <div class="text-end py-1">
                <button
                  type="button"
                  class="btn-close bg-white small"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="d-flex justify-content-center">
                <video
                  controls
                  class="img-fluid"
                  :src="activePost.imgUrl"
                  alt=""
                />
              </div>
              <div class="text-center d-flex">
                <!-- <p class="m-0 pb-2 pt-3 w-100 title">{{ activePost.title }}</p> -->
                <div class="text-end align-self-center">
                  <button
                    v-show="
                      activePost.creatorId === account.id ||
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
          Modal.getOrCreateInstance(document.getElementById("video-modal")).toggle()
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
  padding-top: 9vh !important;
  border-radius: 0;
  width: 100% !important;
  min-height: 90vh;
  background-color: #00000091;
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
  max-height: 70vh;
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
.filmstrip {
  --background: rgba(0, 0, 0, 0.746);
  --size: 35px;
  background-image: linear-gradient(
      to right,
      var(--background) var(--size),
      transparent var(--size)
    ),
    linear-gradient(
      to bottom,
      var(--background) var(--size),
      transparent var(--size)
    ),
    linear-gradient(
      to right,
      var(--background) var(--size),
      transparent var(--size)
    ),
    linear-gradient(
      to bottom,
      var(--background) var(--size),
      transparent var(--size)
    ),
    linear-gradient(
      to bottom,
      transparent var(--size),
      var(--background) var(--size)
    );
  background-size: calc(var(--size) * 2) var(--size),
    calc(var(--size) * 2) var(--size), calc(var(--size) * 2) var(--size),
    calc(var(--size) * 2) var(--size), 100% calc(100% - var(--size) * 3);
  background-repeat: repeat-x;
  background-position: 0 var(--size), top left, 0 calc(100% - var(--size)),
    bottom left, 0 var(--size);
  padding: calc(var(--size) * 3) calc(var(--size) * 2.5);
  box-sizing: border-box;
}

div {
  max-height: 100vh;
  width: 100%;
  color: rgb(255, 255, 255);
}
</style>