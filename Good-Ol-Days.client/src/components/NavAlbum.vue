<template>
  <div class="component">
    <div class="desktop d-flex">
      <div class="d-flex flex-row">
        <div>
          <button
            title="Add to this this album"
            data-bs-toggle="modal"
            data-bs-target="#createPostModal"
            class="btn add elevation-3"
          >
            <i class="mdi me-1 mdi-18px mdi-plus-circle-outline"> </i>Add to
            this album
          </button>
          <div>
            <p class="album text-start">Album: Private</p>
          </div>
        </div>
        <div>
          <button title="Share this album" class="btn share elevation-3">
            <i class="mdi ms-1 mdi-18px mdi-share-variant"></i> Share this album
          </button>
        </div>
        <div>
          <button
            @click="deleteAlbum"
            title="Delete this album"
            class="btn delete elevation-3"
          >
            <i class="mdi mdi-18px mdi-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="mobile">
      <button
        data-bs-toggle="modal"
        data-bs-target="#createPostModal"
        title="Add to this album"
        class="btn add elevation-3"
      >
        <i class="mdi mdi-18px mdi-plus-circle-outline"> </i>
      </button>
      <button title="Share this album" class="btn share elevation-3">
        <i class="mdi mdi-18px mdi-share-variant"></i>
      </button>
      <button title="Delete this album" class="btn delete elevation-3">
        <i class="mdi mdi-18px mdi-trash-can"></i>
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { albumService } from "../services/AlbumService"
import { useRoute, useRouter } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    return {
      router,
      route,
      activeAlbum: computed(() => AppState.activeAlbum),
      async deleteAlbum() {
        try {
          if (await Pop.confirm()) {
            await albumService.deleteAlbum(route.params.albumId)
            router.push({ name: 'Home' })
            Pop.toast('Album deleted!', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.add {
  background-color: #36a7d7;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
}
.share {
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.delete {
  background-color: #e94040;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.desktop {
  display: block;
}
.mobile {
  display: none;
}
.album {
  margin: 0;
  padding: 0.5vh;
  padding-left: 5vh;
  font-size: 1.5vh;
  color: #9b9b9b;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
@media only screen and (max-width: 500px) {
  .desktop {
    display: none !important;
  }
  .mobile {
    display: block;
  }
  .add {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 4px;
  }
  .share {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 4px !important;
    margin: 0;
  }
  .delete {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>