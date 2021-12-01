<template>
  <div class="modal fade" id="createPostModal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h1 class="text-white modal-title">Add To Album</h1>
      </div>
      <form @submit.prevent="createPost">
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <h10></h10>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
export default {
  setup() {
    return {
      async createPost() {
        Pop.toast('HEllo')
      },
      activeAlbum: computed(() => AppState.activeAlbum)
    }
  },
}
</script>
<style scoped>
</style>