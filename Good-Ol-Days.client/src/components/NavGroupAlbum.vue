<template>
  <div class="component">
    <div class="desktop d-flex">
      <div class="d-flex">
        <div class="me-5">
          <div class="card topcard border-0 text-center">
            {{ collabThisAlbum[0].albumTitle }}
          </div>
          <div class="card bottomcard border-0">
            <div>
              <p class="p-0 mb-0 ps-2">People in this group:</p>
            </div>
            <div class="d-flex">
              <div>
                <div class="">
                  <img
                    :title="activeAlbum.creator.name"
                    class="profilepics"
                    :src="activeAlbum.creator.picture"
                    alt=""
                  />
                </div>
              </div>
              <div v-for="u in collabThisAlbum" :key="u.accountId">
                <ProfileCircles :collab="u" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
          class="btn add elevation-3"
        >
          <i class="mdi me-1 mdi-18px mdi-plus-circle-outline"> </i>Add to this
          album
        </button>
        <div>
          <p class="album text-center">Album: Shared</p>
        </div>
      </div>
      <div
        class="d-flex align-items-center"
        v-if="activeAlbum.creatorId === account.id"
      >
        <button
          @click="deleteAlbum"
          title="Delete this album"
          class="btn mb-4 delete btn-outline-danger"
        >
          <i class="mdi mdi-18px mdi-trash-can"></i>
        </button>
      </div>
    </div>
    <div class="mobile">
      <div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
          class="btn add elevation-3"
        >
          <i class="mdi mdi-18px mdi-plus-circle-outline"> </i>
        </button>
        <button
          @click="deleteAlbum"
          v-if="activeAlbum.creatorId === account.id"
          title="Delete this album"
          class="btn btn-danger-outline ms-2 delete elevation-3"
        >
          <i class="mdi mdi-18px mdi-trash-can"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { albumService } from "../services/AlbumService"
import { useRoute, useRouter } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    return {
      route,
      router,
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      account: computed(() => AppState.account),
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
  background-color: #9964cc;
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
.desktop {
  display: block;
}
.mobile {
  display: none;
}
.album {
  margin: 0;
  padding: 0.5vh;
  padding-right: 5vh;
  font-size: 1.5vh;
  color: #9b9b9b;
}
.topcard {
  min-width: 35vh;
  padding: 0.5vh;
  padding-left: 2vh;
  background-color: rgb(231, 231, 231);
  margin-bottom: 0.5vh;
  font-family: "Saira Condensed", sans-serif;
}
.bottomcard {
  min-width: 35vh;
  min-height: 6vh;
  background-color: rgb(231, 231, 231);
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.7vh;
}
.profilepics {
  border-radius: 50%;
  height: 4vh;
  width: 4vh;
  object-fit: cover;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.delete {
  color: #999999;
  border-color: #999999;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.delete:hover {
  background-color: red;
  color: white;
  border-color: red;
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
    margin: 0;
  }
  .share {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0;
    margin-bottom: 4px;
    margin-top: 4px;
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