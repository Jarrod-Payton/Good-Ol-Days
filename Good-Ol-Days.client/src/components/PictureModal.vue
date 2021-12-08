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
        <div
          class="modal-content border-0 rounded-0 transparent"
          @click="flipped = !flipped"
        >
          <div class="modal-body d-flex justify-content-center">
            <!-- Front side of modal -->
            <transition name="front">
              <div v-if="flipped" class="card frontM">
                <div
                  class="
                    text-end
                    py-1
                    pt-2
                    d-flex
                    align-self-between
                    justify-content-between
                  "
                >
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
                  <button
                    type="button"
                    class="btn-close small"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <!-- <div class="text-end align-self-center"></div> -->
                </div>
                <div class="d-flex justify-content-center">
                  <img class="img-fluid" :src="activePost.imgUrl" alt="" />
                </div>
                <div class="text-center d-flex">
                  <p class="m-0 pb-2 pt-3 w-100 title titleSize">
                    {{ activePost.title }}
                  </p>
                </div>
              </div>
              <!-- <div class="text-end align-self-center">
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
                  </div> -->
              <!-- Back side of Modal -->

              <div v-else class="card sizing">
                <div
                  class="
                    pt-2
                    text-end
                    d-flex
                    align-self-between
                    justify-content-between
                  "
                >
                  <div>
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
                  <div class="card-title text-center">
                    <h3 class="title titlePadding">{{ activePost.title }}</h3>
                    <p class="title datePadding dateWords">10/12/2021</p>
                  </div>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div class="card-body p-0">
                  <div class="polaroidBody">
                    <h1 class="text-center title description">
                      {{ activePost.description }}
                    </h1>
                  </div>
                  <h1 class="challenge font">
                    Challenge: Take a photo of something that makes you smile
                  </h1>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { postService } from "../services/PostService"
import { Modal } from "bootstrap"
import Pop from "../utils/Pop"
import gsap from 'gsap'
import { logger } from "../utils/Logger"

export default {
  setup() {
    let height = ref('')
    let flipped = ref(true)
    // const beforeEnter = (el) => {
    //   logger.log('before enter')
    //   el.style.transform = 'translateY(90vh)'
    //   // el.style.opacity = 0
    // }
    // const enter = (el, done) => {
    //   logger.log('starting to enter')
    //   gsap.to(el, {
    //     duration: 1,
    //     y: 0,
    //     opacity: 1,
    //     onComplete: done
    //   })
    // }
    // const afterEnter = () => {
    //   logger.log('after enter')
    // }
    // const beforeAppear = (el) => {
    //   el.style.transform = 'translateY(-90vh)'
    // }
    // const appear = (el, done) => {
    //   gsap.to(el, {
    //     duration: 1,
    //     y: 0,
    //     opacity: 1,
    //     onComplete: done
    //   })
    // }

    return {
      height,
      flipped,
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
.modal {
  overflow-y: hidden;
}
.challenge {
  font-size: 2vh;
  display: flex;
  justify-content: center;
  padding: 1vh;
  border-color: #4ac26d;
  border-width: 1vh;
}
.titlePadding {
  font-size: 4.5vh;
  margin-bottom: 0;
}
.titleSize {
  font-size: 4.5vh;
}
.datePadding {
  font-size: 2.25vh;
  margin: 0;
  padding: 0;
}
.description {
  padding-top: 0vh;
  padding: 1.5vh;
  transform: rotate(-15deg);
}
.polaroidBody {
  height: 45vh !important;
  background-color: rgba(0, 0, 0, 0.87);
  color: rgb(255, 255, 255) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25vh;
}
.sizing {
  min-height: 60vh;
  // height: 80vh;
  width: 60vh;
  margin-top: 5vh;
}
.font {
  font-family: "Saira Condensed", sans-serif;
}
@font-face {
  font-family: "MyWebFont";
  src: url("../assets/fonts/Stickynotes-ywLPd.otf") format("woff");
}
.frontM {
  margin-top: 5vh;
}
.title {
  font-family: "MyWebFont";
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

// switch transitions

.front-enter-active {
  transition: all 0.2s cubic-bezier(0.54, -0.35, 0.45, 1.41);
}
.front-leave-active {
  position: absolute;
  transition: all 0.2s cubic-bezier(0.54, -0.35, 0.45, 1.41);
}
.front-enter-from {
  opacity: 0;
  transform: rotate3d(0, 1, 0, 180deg);
}
.front-leave-to {
  position: absolute;
  opacity: 0;
  transform: rotate3d(0, 1, 0, -180deg);
}
</style>