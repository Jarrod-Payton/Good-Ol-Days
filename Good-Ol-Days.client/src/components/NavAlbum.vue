<template>
  <div class="component">
    <div v-if="activeAlbum.creatorId === account.id" class="desktop d-flex">
      <div class="d-flex flex-row">
        <div>
          <button
            v-if="activeAlbum.creatorId === account.id"
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
          <button
            data-bs-toggle="modal"
            data-bs-target="#shareModal"
            title="Share this album"
            class="btn share elevation-3"
          >
            <i class="mdi ms-1 mdi-18px mdi-share-variant"></i>
          </button>
        </div>
        <div>
          <button
            @click="deleteAlbum"
            title="Delete this album"
            class="btn delete"
          >
            <i class="mdi mdi-18px mdi-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="activeAlbum.creatorId === account.id" class="mobile">
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
      <button
        title="Delete this album"
        class="btn delete delete btn-outline-danger elevation-3"
      >
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
      account: computed(() => AppState.account),
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
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 2vh;
}
.share {
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 3px;
  padding-bottom: 2px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.delete {
  color: #999999;
  border-color: #999999;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 2px;
  padding-top: 4px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.delete:hover {
  background-color: red;
  color: white;
  border-color: red;
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