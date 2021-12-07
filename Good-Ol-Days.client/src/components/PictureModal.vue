<template>
  <div class="PictureModal">
    <div
      class="modal fade scrollbar-post parent"
      id="picture-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 rounded-0 transparent">
          <div class="modal-body d-flex justify-content-center flip-container">
            <div class="flipper">
              <div class="front">
                <div class="card">
                  <div class="card-body">
                    <img class="img-fluid" :src="activePost.imgUrl" alt="" />
                  </div>
                </div>
              </div>
              <div class="back">
                <p>Hello World</p>
              </div>
              <!-- <div class="text-end py-1"></div>
              <div class="d-flex justify-content-center"></div>
              <div class="text-center d-flex">
                <p class="m-0 pb-2 pt-3 w-100 title">{{ activePost.title }}</p>
                <div class="text-end align-self-center"> -->
              <!-- <button
                    v-show="
                      posts.creatorId === account.id ||
                      activeAlbum.creatorId === account.id
                    "
                    title="Delete this picture"
                    @click="deletePost"
                    class="btn delete m-0"
                  >
                    <i class="mdi mdi-24px me-2 mdi-trash-can"></i> 
                  </button> -->
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn-close small"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div> -->
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
.flip-container.hover .flipper {
  transform: rotateY(180deg);
}

.flip-container,
.front,
.back {
  width: 250px;
  height: 250px;
}

/* flip speed */

.flipper {
  transition: 0.8s;
  transform-style: preserve-3d;
  position: relative;
}

/* hide back of pane during swap */

.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

/* front pane, placed above back */

.front {
  z-index: 2;
  transform: rotateY(0deg);
}

/* back, initially hidden pane */

.back {
  transform: rotateY(180deg);
  background-color: #fff;
}
.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
}
.polaroid > img {
  max-width: auto;
  height: 30vh;
  object-fit: cover;
}
.scrollbar-post {
  overflow-y: scroll;
}
.scrollbar-post::-webkit-scrollbar {
  width: 0vh;
}
.image {
  width: auto !important;
}
// .flip-card {
//   background-color: transparent;
//   width: 80%;
//   height: 100%;
//   perspective: 1000px; /* Remove this if you don't want the 3D effect */
// }

// /* This container is needed to position the front and back side */
// .flip-card-inner {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   text-align: center;
//   transition: transform 0.8s;
//   transform-style: preserve-3d;
// }

// /* Do an horizontal flip when you move the mouse over the flip box container */
// .flip-card:hover .flip-card-inner {
//   transform: rotateY(180deg);
// }

// /* Position the front and back side */
// .flip-card-front,
// .flip-card-back {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   -webkit-backface-visibility: hidden; /* Safari */
//   backface-visibility: hidden;
// }

// /* Style the front side (fallback if image is missing) */
// .flip-card-front {
//   background-color: #bbb;
//   color: black;
// }

// /* Style the back side */
// .flip-card-back {
//   background-color: dodgerblue;
//   color: white;
//   transform: rotateY(180deg);
// }
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
  max-width: 200vh;
  width: auto !important;
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
@media only screen and (max-width: 500px) {
  .img-fluid {
    max-height: 80vh;
    max-width: 30vh;
    width: auto !important;
    margin-left: 0;
  }
  .parent {
    margin-left: 0 !important;
    padding-left: 0;
  }
}
</style>