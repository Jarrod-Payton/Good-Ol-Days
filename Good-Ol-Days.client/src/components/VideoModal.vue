<template>
  <div class="VideoModal">
    <div
      class="modal fade"
      id="video-modal"
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
                    title="Delete this video"
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
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>