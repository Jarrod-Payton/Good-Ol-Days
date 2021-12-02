<template>
  <div
    class="
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="card cardspec">
      <div class="d-flex justify-content-between">
        <div class="p-4">
          <p class="titles">Your Albums:</p>
        </div>
        <div class="desktop">
          <button
            class="btn buttonscss elevation-3"
            data-bs-toggle="modal"
            data-bs-target="#createAlbumModal"
          >
            <i class="mdi mdi-18px mdi-plus-circle me-1"></i> Add Album
          </button>
        </div>
      </div>
      <!-- ALBUMS GO HERE v  -->
      <div class="row">
        <Album v-for="a in myAlbums" :key="a.id" :album="a" />
      </div>
      <div class="media text-center mb-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createAlbumModal"
          class="btn buttonscss elevation-3"
        >
          <i class="me-1 mdi-18px mdi mdi-plus-circle"></i> Add Album
        </button>
      </div>
      <!-- ALBUMS GO HERE ^  -->
    </div>
    <div class="card cardspec mb-3">
      <div class="d-flex justify-content-between">
        <div class="p-4">
          <p class="titles">Your Group Albums:</p>
        </div>
        <div class="desktop">
          <button class="btn buttonscss elevation-3">
            <i class="me-1 mdi-18px mdi mdi-plus-circle"></i> Start a group
            album
          </button>
        </div>
      </div>
      <!-- GROUP ALBUMS GO HERE v  -->
      <div
        class="
          d-flex
          justify-content-center
          align-items-center
          flex-column
          margindesk
        "
        v-for="c in collaborators"
        :key="c.albumId"
      >
        <div class="card cardgroupalbum grow2 mb-3">
          <p class="gpalbumtitle">{{ c.albumTitle }}</p>
        </div>
      </div>
      <!-- GROUP ALBUMS GO HERE ^ -->
      <div class="media text-center mb-3">
        <button class="btn buttonscss elevation-3">
          <i class="me-1 mdi-18px mdi mdi-plus-circle"></i> Start a group album
        </button>
      </div>
    </div>
  </div>
  <CreateAlbumModal />
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { albumService } from "../services/AlbumService"
import { collaboratorService } from "../services/CollaboratorService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      await albumService.getMyAlbums()
      AppState.activeAlbum = {}
      await collaboratorService.getAllMyCollabAlbums()
    })
    return {
      myAlbums: computed(() => AppState.myAlbums),
      collaborators: computed(() => AppState.collaborators)
    }
  }
}
</script>

<style scoped lang="scss">
.eachone {
  width: 100%;
}
.cardspec {
  margin-top: 3vh;
  width: 99%;
  min-height: 20vh;
  border-width: 5px;
  border-radius: 0;
  border-color: #36a7d7;
  background-color: rgba(245, 245, 245, 0.842);
}
.titles {
  font-size: 5vh;
  margin-left: 2vh;
  margin-bottom: 0;
}
.buttonscss {
  background-color: #4ac26d;
  margin-top: 2vh;
  margin-right: 3vh;
  color: white;
  font-size: 2.2vh;
  font-family: "Saira Condensed", sans-serif;
  letter-spacing: 0.4px;
}
.picalbum {
  height: 20vh;
}
.albumname {
  margin-top: 0.5vh;
  font-size: 3vh;
}
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}
.grow2 {
  transition: all 0.2s ease-in-out;
}

.grow2:hover {
  transform: scale(1.01);
}
.cardgroupalbum {
  width: 85%;
  height: 5vh;
  border-width: 3px;
  border-radius: 0;
  background-color: rgb(243, 243, 243);
  border-color: #36a7d7;
}
.gpalbumtitle {
  margin-left: 3vh;
  font-size: 3vh;
}
.media {
  display: none;
}
.desktop {
  display: block;
}
.margindesk {
  margin-bottom: 2vh;
}
@media only screen and (max-width: 500px) {
  .media {
    display: block;
  }
  .desktop {
    display: none;
  }
  .buttonscss {
    background-color: #4ac26d;
    margin-top: 2vh;
    margin-right: 2vh;
    color: white;
    font-size: 2vh;
    font-family: "Saira Condensed", sans-serif;
    letter-spacing: 0.4px;
  }
  .titles {
    font-size: 3vh;
    margin-left: 2vh;
  }
  .picalbum {
    height: 12vh;
  }
  .albumname {
    margin-top: 0.5vh;
    font-size: 2vh;
  }
  .gpalbumtitle {
    margin-left: 1vh;
    font-size: 3vh;
  }
  .margindesk {
    margin-bottom: 0vh;
  }
}
</style>
