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
                  <button title="Download This Picture" class="btn p-0 m-0">
                    <i class="mdi mdi-24px blue mdi-cloud-download"></i>
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
export default {
  setup() {
    return {
      activePost: computed(() => AppState.activePost)
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
  color: #36a7d7;
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
</style>